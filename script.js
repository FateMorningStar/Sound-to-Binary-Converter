document.getElementById("convertButton").addEventListener("click", function () {
    const frequency = Number(document.getElementById("frequency").value);
    const amplitude = Number(document.getElementById("amplitude").value);
    const samples = Number(document.getElementById("samples").value);
    const bits = Number(document.getElementById("bits").value);
    const warning = document.getElementById("warning");
    const waveFacts = document.getElementById("waveFacts");
    const sampleRows = document.getElementById("sampleRows");
    const binaryResult = document.getElementById("binaryResult");
    const totalBits = document.getElementById("totalBits");
warning.textContent = "";
waveFacts.textContent = "";
sampleRows.innerHTML = "";
binaryResult.textContent = "";
totalBits.textContent = "";

  
if(document.getElementById("frequency").value.trim() === "" ||
        document.getElementById("amplitude").value.trim() === "" ||
        document.getElementById("samples").value.trim() === "" ||
        document.getElementById("bits").value.trim() === "" ||
        !Number.isFinite(frequency) ||
        !Number.isFinite(amplitude) ||
        !Number.isInteger(samples) ||
        !Number.isInteger(bits) ||
        frequency <= 0 ||
        amplitude < 0 ||
        amplitude > 1 ||
        samples < 2 ||
        samples > 64 ||
        bits < 1 ||
        bits > 8) 
{
     warning.textContent =
            "Warning: Enter valid values only. Frequency must be above 0, amplitude 0–1, samples 2–64, and bits 1–8.";
        return;
    }
const period = 1 / frequency;
const periodMs = period * 1000;
const wavelength = 343 / frequency;
let wavelengthText;

if (wavelength >= 1) {
        wavelengthText = wavelength.toFixed(2) + " m";
    } else {
        wavelengthText = (wavelength * 100).toFixed(1) + " cm";
    }
waveFacts.innerHTML = `
<p>Amplitude: ${document.getElementById("amplitude").value}</p>
<p>Frequency: ${document.getElementById("frequency").value} Hz</p>
<p>Period: ${periodMs.toFixed(2)} ms</p>
<p>Wavelength: ${wavelengthText}</p>`;
   
const levels = Math.pow(2, bits);
const binaryValues = [];
  
    for (let i = 0; i < samples; i++) {
const timeMs = (i * periodMs) / samples;
const height = amplitude * Math.sin(
            (2 * Math.PI * i) / samples
        );
        const level = Math.floor(
        ((height + 1) / 2) * (levels - 1) + 0.5
        );
const binary = level.toString(2).padStart(bits, "0");
        binaryValues.push(binary);
const row = document.createElement("tr");
        
      row.innerHTML = `
<td>${i + 1}</td>
<td>${timeMs.toFixed(2)}</td>
<td>${height.toFixed(2)}</td>
<td>${level}</td>
<td>${binary}</td>`;
        sampleRows.appendChild(row);
    }
document.getElementById("binaryResult").textContent =
        binaryValues.join(" ");
document.getElementById("totalBits").textContent =
        "Total bits: " + (samples * bits);
});
