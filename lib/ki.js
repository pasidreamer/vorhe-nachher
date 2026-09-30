// Bilderkennung "verschmutzt / sauber" + Bild-Merkmale für den Vergleich.
// Modell: MobileCLIP-S0 (Apple), läuft im Browser (transformers.js). Die Fotos verlassen
// das Gerät nicht; beim ersten Mal werden nur das Programm (jsdelivr) und das Modell
// (huggingface.co, ca. 45 MB) geladen, danach liegen sie im Browser-Zwischenspeicher.
//
// SCHMUTZ_ACHSE = Mittel der Text-Merkmale "dirty ..." minus Mittel "clean ..." (je 6 Sätze:
// Kanal, Küchenhaube, Ventilator, Metall, Monoblock, Rohr). Skalarprodukt mit dem
// Bild-Merkmal x 100 = Schmutz-Wert (> 0 eher verschmutzt, < 0 eher sauber).

const KI_MODELL = 'Xenova/mobileclip_s0';
const KI_BIBLIOTHEK = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.0';
const SCHMUTZ_ACHSE_B64 = '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';

const SCHMUTZ_ACHSE = new Float32Array(Uint8Array.from(atob(SCHMUTZ_ACHSE_B64), (c) => c.charCodeAt(0)).buffer);
const SCHMUTZ_RICHTUNG = (() => {
  let n = 0; for (const x of SCHMUTZ_ACHSE) n += x * x; n = Math.sqrt(n);
  return SCHMUTZ_ACHSE.map((x) => x / n);
})();

let kiBereit = null;
function kiLaden() {
  kiBereit = kiBereit || (async () => {
    const T = await import(KI_BIBLIOTHEK);
    const [prozessor, modell] = await Promise.all([
      T.AutoProcessor.from_pretrained(KI_MODELL),
      T.CLIPVisionModelWithProjection.from_pretrained(KI_MODELL, { dtype: 'fp32' }),
    ]);
    return { T, prozessor, modell };
  })();
  kiBereit.catch(() => { kiBereit = null; });
  return kiBereit;
}

// Liefert { schmutz, merkmal }: merkmal = Bild-Merkmal OHNE die Schmutz-Richtung,
// damit "gleicher Kanal verschmutzt" und "gleicher Kanal sauber" ähnlich aussehen.
async function kiAnalysieren(blob) {
  const { T, prozessor, modell } = await kiLaden();
  const bild = await T.RawImage.fromBlob(blob);
  const { image_embeds } = await modell(await prozessor(bild));
  const e = image_embeds.normalize(2, -1).data;
  let schmutz = 0, anteil = 0;
  for (let i = 0; i < e.length; i++) { schmutz += e[i] * SCHMUTZ_ACHSE[i]; anteil += e[i] * SCHMUTZ_RICHTUNG[i]; }
  const merkmal = new Float32Array(e.length);
  let n = 0;
  for (let i = 0; i < e.length; i++) { merkmal[i] = e[i] - anteil * SCHMUTZ_RICHTUNG[i]; n += merkmal[i] ** 2; }
  n = Math.sqrt(n) || 1;
  for (let i = 0; i < e.length; i++) merkmal[i] /= n;
  return { schmutz: schmutz * 100, merkmal };
}
