import fs from 'fs';
import path from 'path';

function createWavBuffer(samples, sampleRate = 44100, channels = 1) {
  const byteRate = sampleRate * channels * 2;
  const blockAlign = channels * 2;
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1size
  buffer.writeUInt16LE(1, 20);  // PCM format
  buffer.writeUInt16LE(channels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // 16-bit

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // write 16-bit samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const intVal = s < 0 ? s * 32768 : s * 32767;
    buffer.writeInt16LE(Math.floor(intVal), offset);
    offset += 2;
  }

  return buffer;
}

// 1. Whoosh (sweeping white noise with resonant bandpass filter)
function generateWhoosh(duration = 0.55, sampleRate = 44100) {
  const numSamples = Math.floor(duration * sampleRate);
  const samples = new Float32Array(numSamples);

  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < numSamples; i++) {
    const t = i / numSamples;
    // Bell curve amplitude
    const env = Math.sin(t * Math.PI) ** 1.8;
    // Frequency sweep from 250Hz up to 1400Hz and back down to 350Hz
    const centerFreq = 250 + Math.sin(t * Math.PI) * 1150;
    const q = 3.5;
    const omega = (2 * Math.PI * centerFreq) / sampleRate;
    const alpha = Math.sin(omega) / (2 * q);
    
    // white noise sample
    const noise = (Math.random() * 2 - 1);
    
    // Simple state-variable or resonant filter approximation
    b0 = b0 + omega * b1;
    b1 = b1 - omega * b0 - alpha * b1 + noise * 0.4;
    
    // Add subtle low sub rumble
    const sub = Math.sin(2 * Math.PI * 65 * (i / sampleRate)) * 0.25 * env;
    
    samples[i] = (b1 * 0.75 + sub) * env;
  }
  return createWavBuffer(samples, sampleRate);
}

// 2. UI Click (Snappy mechanical click with short high-frequency transient)
function generateClick(duration = 0.08, sampleRate = 44100) {
  const numSamples = Math.floor(duration * sampleRate);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env1 = Math.exp(-t * 120);
    const env2 = Math.exp(-t * 35);
    const transient = Math.sin(2 * Math.PI * 1800 * t) * env1 * 0.6;
    const thud = Math.sin(2 * Math.PI * 220 * t) * env2 * 0.4;
    const pop = (Math.random() * 2 - 1) * Math.exp(-t * 280) * 0.3;
    samples[i] = transient + thud + pop;
  }
  return createWavBuffer(samples, sampleRate);
}

// 3. Cinematic Sub Impact Boom (Deep punch + sub rumble + harmonic overtone)
function generateImpact(duration = 1.4, sampleRate = 44100) {
  const numSamples = Math.floor(duration * sampleRate);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Pitch drops from 120Hz to 38Hz
    const freq = 38 + 85 * Math.exp(-t * 12);
    const phase = 2 * Math.PI * (38 * t + (85 / -12) * (Math.exp(-t * 12) - 1));
    const sub = Math.sin(phase);
    
    // Punch transient
    const transient = (Math.random() * 2 - 1) * Math.exp(-t * 60) * 0.4;
    // Sub sustain
    const subEnv = Math.exp(-t * 3.5);
    // Metallic chime overtone
    const ring = Math.sin(2 * Math.PI * 620 * t) * Math.exp(-t * 8) * 0.15;
    
    samples[i] = (sub * 0.75 + ring) * subEnv + transient;
  }
  return createWavBuffer(samples, sampleRate);
}

// 4. Chime Success (Crystal bell triad: C5 - E5 - G5 - C6)
function generateChime(duration = 1.1, sampleRate = 44100) {
  const numSamples = Math.floor(duration * sampleRate);
  const samples = new Float32Array(numSamples);

  const notes = [
    { freq: 523.25, delay: 0.0, vol: 0.35 },  // C5
    { freq: 659.25, delay: 0.05, vol: 0.35 }, // E5
    { freq: 783.99, delay: 0.10, vol: 0.40 }, // G5
    { freq: 1046.50, delay: 0.15, vol: 0.35 },// C6
  ];

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sum = 0;
    for (const note of notes) {
      if (t >= note.delay) {
        const noteT = t - note.delay;
        const env = Math.exp(-noteT * 4.2);
        const osc = Math.sin(2 * Math.PI * note.freq * noteT)
          + 0.25 * Math.sin(2 * Math.PI * (note.freq * 2) * noteT);
        sum += osc * env * note.vol;
      }
    }
    samples[i] = sum * 0.7;
  }
  return createWavBuffer(samples, sampleRate);
}

// 5. Tension Riser (Pitch ascending from 100Hz to 900Hz with building white noise)
function generateRiser(duration = 1.8, sampleRate = 44100) {
  const numSamples = Math.floor(duration * sampleRate);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / numSamples; // 0 to 1
    const env = t ** 2.2;
    // Instantaneous frequency swept logarithmically from 90 to 880
    const freq = 90 * Math.pow(880 / 90, t);
    const phase = 2 * Math.PI * ((90 / Math.log(880 / 90)) * (Math.pow(880 / 90, t) - 1));
    const tone = Math.sin(phase) * 0.4;
    const noise = (Math.random() * 2 - 1) * 0.35 * env;
    samples[i] = (tone + noise) * env * 0.8;
  }
  return createWavBuffer(samples, sampleRate);
}

// 6. Countdown Tick (Crisp wooden digital tick)
function generateTick(duration = 0.06, sampleRate = 44100) {
  const numSamples = Math.floor(duration * sampleRate);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 90);
    const tone = Math.sin(2 * Math.PI * 1400 * t) * env * 0.6;
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 180) * 0.3;
    samples[i] = tone + noise;
  }
  return createWavBuffer(samples, sampleRate);
}

// Output directory
const sfxDir = path.resolve(process.cwd(), 'public/sfx');
if (!fs.existsSync(sfxDir)) {
  fs.mkdirSync(sfxDir, { recursive: true });
}

fs.writeFileSync(path.join(sfxDir, 'whoosh.wav'), generateWhoosh(0.55));
fs.writeFileSync(path.join(sfxDir, 'click.wav'), generateClick(0.08));
fs.writeFileSync(path.join(sfxDir, 'impact.wav'), generateImpact(1.4));
fs.writeFileSync(path.join(sfxDir, 'chime.wav'), generateChime(1.1));
fs.writeFileSync(path.join(sfxDir, 'riser.wav'), generateRiser(1.8));
fs.writeFileSync(path.join(sfxDir, 'tick.wav'), generateTick(0.06));

console.log('Successfully generated SFX audio files in public/sfx');
