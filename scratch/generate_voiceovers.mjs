/* global console */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import process from 'node:process';

const outDir = path.resolve(process.cwd(), 'public/voicehover');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const scenes = [
  {
    name: 'scene1',
    rate: 185,
    text: 'Hiring process is broken. We just fixed it. Welcome to TalentCred.'
  },
  {
    name: 'scene2',
    rate: 185,
    text: 'Fragmented resumes, unverified claims, and weeks wasted screening fraud. The hiring pipeline is in chaos.'
  },
  {
    name: 'scene3',
    rate: 185,
    text: 'Meet TalentCred. One unified dashboard, cryptographically verified credentials, and instantly tailored resumes for every role you target.'
  },
  {
    name: 'scene4',
    rate: 180,
    text: 'The countdown has officially begun. Mark your calendar: October 26th.'
  },
  {
    name: 'scene5',
    rate: 180,
    text: 'Claim your verified credential profile today at talentcred.com. Don’t get left behind.'
  }
];

// Use Samantha for clean, modern tech voice
for (const s of scenes) {
  const aiffPath = path.join(outDir, `${s.name}.aiff`);
  const wavPath = path.join(outDir, `${s.name}.wav`);
  console.log(`Generating ${s.name}...`);
  execSync(`say -v Samantha -r ${s.rate} -o "${aiffPath}" "${s.text}"`);
  execSync(`afconvert -f WAVE -d LEI16 "${aiffPath}" "${wavPath}"`);
  fs.unlinkSync(aiffPath);
}

console.log('Finished generating preview voiceovers in public/voicehover!');
