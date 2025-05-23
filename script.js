const btn = document.getElementById("btnFetch");
const result = document.getElementById("result");
const API_URL = "http://localhost:8000/patients/";

btn.addEventListener("click", async () => {
  const id = document.getElementById("patientId").value;
  result.innerHTML = "Cargando…";

  try {
    const res = await fetch(API_URL + id);
    if (!res.ok) throw new Error("Paciente no encontrado");
    const data = await res.json();

    result.innerHTML = `
      <div class="patient">
        <h2>${data.name} (ID: ${data.id})</h2>
        <h3>Alergias</h3>
        <ul>${data.allergies.map(a => `<li>${a.substance}</li>`).join("")}</ul>
        <h3>Antecedentes</h3>
        <ul>${data.histories.map(h => `<li>${h.description}</li>`).join("")}</ul>
        <h3>Medicamentos Actuales</h3>
        <ul>${data.medications.map(m => `<li>${m.name} — ${m.dosage}</li>`).join("")}</ul>
      </div>
    `;
  } catch (err) {
    result.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
});