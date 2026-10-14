function showSuccess(form, message) {
  const output = form.querySelector('.result');
  if (output) {
    output.textContent = message;
    output.className = 'result alert alert-success';
  }
}
function setupForm(formId, advanced = false) {
  const form = document.getElementById(formId);
  if (!form) return;
  const password = form.querySelector('[name="password"]');
  const confirm = form.querySelector('[name="confirmPassword"]');
  function checkPassword() {
    if (password && confirm) {
      confirm.setCustomValidity(confirm.value && password.value !== confirm.value ? 'Passwords do not match' : '');
    }
  }
  function updateFeedback() {
    checkPassword();
    form.querySelectorAll('input, textarea, select').forEach(field => {
      if (field.type === 'radio' || field.type === 'checkbox' || field.type === 'reset' || field.type === 'submit') return;
      field.classList.toggle('is-valid', field.checkValidity() && field.value.trim() !== '');
      field.classList.toggle('is-invalid', !field.checkValidity());
    });
  }
  form.addEventListener('input', () => { if (form.classList.contains('was-validated')) updateFeedback(); });
  form.addEventListener('change', () => { if (form.classList.contains('was-validated')) updateFeedback(); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    checkPassword();
    form.classList.add('was-validated');
    if (advanced) updateFeedback();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    showSuccess(form, 'Success! Your form was validated and submitted (demo only).');
  });
  form.addEventListener('reset', () => {
    form.classList.remove('was-validated');
    form.querySelectorAll('.is-valid, .is-invalid').forEach(field => field.classList.remove('is-valid','is-invalid'));
    if (confirm) confirm.setCustomValidity('');
    const output = form.querySelector('.result');
    if (output) { output.textContent = ''; output.className = 'result'; }
  });
}
