import type { Blueprint } from '../types/blueprint'
import { MOCK_BLUEPRINT, GENERATION_STEPS } from './mock/mockData'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AI === 'true' || !GEMINI_API_KEY

export async function generateBlueprint(
  idea: string,
  onStepComplete: (stepId: string) => void,
  onProgress: (message: string) => void
): Promise<Blueprint> {
  if (USE_MOCK) {
    return generateMockBlueprint(onStepComplete, onProgress)
  }
  return generateGeminiBlueprint(idea, onStepComplete, onProgress)
}

async function generateMockBlueprint(
  onStepComplete: (stepId: string) => void,
  onProgress: (message: string) => void
): Promise<Blueprint> {
  for (const step of GENERATION_STEPS) {
    onProgress(step.label)
    await new Promise((r) => setTimeout(r, step.delay))
    onStepComplete(step.id)
  }
  return MOCK_BLUEPRINT
}

async function generateGeminiBlueprint(
  idea: string,
  onStepComplete: (stepId: string) => void,
  onProgress: (message: string) => void
): Promise<Blueprint> {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`

  const systemPrompt = `You are an expert CTO and software architect. Given a startup idea, generate a complete engineering blueprint as structured JSON. Be detailed, realistic, and production-grade.

Idea: "${idea}"

Return a JSON object matching this structure exactly:
{
  "requirements": { "functional": [], "nonFunctional": [], "userStories": [], "acceptanceCriteria": [] },
  "architecture": { "pattern": "", "rationale": "", "scalingStrategy": "", "components": [], "connections": [] },
  "database": { "type": "", "tables": [], "relationships": [], "indexes": [] },
  "apis": { "baseUrl": "", "version": "", "authentication": "", "endpoints": [] },
  "security": { "score": 80, "threats": [], "owaspChecks": [], "recommendations": [] },
  "infrastructure": { "provider": "aws", "deploymentStrategy": "", "monitoring": [], "scaling": {}, "services": [] },
  "costs": { "monthly": { "total": 0, "breakdown": [] }, "scenarios": { "users100": { "total": 0, "breakdown": [] }, "users1k": { "total": 0, "breakdown": [] }, "users10k": { "total": 0, "breakdown": [] }, "users100k": { "total": 0, "breakdown": [] } } },
  "roadmap": { "totalSprints": 6, "sprintDuration": 2, "milestones": [], "sprints": [] },
  "documentation": { "prd": "", "srs": "", "readme": "", "apiDocs": "", "deploymentGuide": "" }
}`

  onProgress('Connecting to Gemini AI...')

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
          maxOutputTokens: 8192,
        },
      }),
    })

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      console.error('Gemini API Error Response:', data)
      throw new Error('No response from Gemini')
    }

    // Safely extract the JSON object, ignoring any conversational filler
    const firstBrace = text.indexOf('{')
    const lastBrace = text.lastIndexOf('}')
    
    if (firstBrace === -1 || lastBrace === -1) {
      console.error('Gemini text response did not contain JSON:', text)
      throw new Error('No JSON object found in Gemini response')
    }
    
    const jsonStr = text.substring(firstBrace, lastBrace + 1)

    // Simulate step completion during Gemini processing
    for (const step of GENERATION_STEPS) {
      onStepComplete(step.id)
      await new Promise((r) => setTimeout(r, 300))
    }

    const blueprint = JSON.parse(jsonStr) as Blueprint
    return blueprint
  } catch (err) {
    console.error('Gemini API error, falling back to mock:', err)
    return generateMockBlueprint(onStepComplete, onProgress)
  }
}
