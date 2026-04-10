/* ==========================================================================
   Nano Banana 2 — Gemini Image Generation API
   Google AI Studio integration for MLC visual assets

   Usage: node gemini-images.js --prompt "executive boardroom" --output hero.png
   ========================================================================== */

const GEMINI_API_KEY = 'AIzaSyCz1TOKETvuazJOY3OCOj67btHSXwmwolQ';
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

async function generateImage(prompt, outputPath) {
  const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Generate an image: ${prompt}`
        }]
      }],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE']
      }
    })
  });

  const data = await response.json();

  if (data.candidates?.[0]?.content?.parts) {
    for (const part of data.candidates[0].content.parts) {
      if (part.inlineData) {
        const fs = require('fs');
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        fs.writeFileSync(outputPath, buffer);
        console.log(`Image saved to ${outputPath}`);
        return outputPath;
      }
    }
  }

  console.error('No image generated:', JSON.stringify(data, null, 2));
  return null;
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const promptIdx = args.indexOf('--prompt');
  const outputIdx = args.indexOf('--output');

  if (promptIdx === -1) {
    console.log('Usage: node gemini-images.js --prompt "description" --output filename.png');
    process.exit(1);
  }

  const prompt = args[promptIdx + 1];
  const output = outputIdx !== -1 ? args[outputIdx + 1] : 'output.png';

  generateImage(prompt, output);
}

module.exports = { generateImage, GEMINI_API_KEY };
