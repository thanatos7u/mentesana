
document.addEventListener('DOMContentLoaded', function () {

  /* --- Marcar enlace activo según la página --- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.ms-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });

  /* --- Animación reveal al hacer scroll --- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('show'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => obs.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('show'));
  }

  /* --- Formulario de contacto --- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      const msg = document.getElementById('contactMsg');
      msg.classList.remove('d-none');
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }

  /* --- Calendario de "Agendar cita" --- */
  const calBody = document.getElementById('calBody');
  if (calBody) {
    const monthNames = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO',
      'JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
    let current = new Date();
    let selectedDay = null;

    function renderCal() {
      const y = current.getFullYear();
      const m = current.getMonth();
      document.getElementById('calMonth').textContent = monthNames[m];
      document.getElementById('calYear').textContent = y;

      const firstDay = new Date(y, m, 1).getDay();      // 0 = domingo
      const daysInMonth = new Date(y, m + 1, 0).getDate();

      let html = '<tr>';
      for (let i = 0; i < firstDay; i++) html += '<td class="empty"></td>';
      for (let d = 1; d <= daysInMonth; d++) {
        const dow = (firstDay + d - 1) % 7;
        const sun = dow === 0 ? ' sun' : '';
        const sel = (selectedDay === d) ? ' selected' : '';
        html += `<td class="day${sun}${sel}" data-day="${d}">${d}</td>`;
        if (dow === 6) html += '</tr><tr>';
      }
      html += '</tr>';
      calBody.innerHTML = html;

      calBody.querySelectorAll('td.day').forEach(td => {
        td.addEventListener('click', () => {
          selectedDay = parseInt(td.dataset.day, 10);
          renderCal();
        });
      });
    }

    document.getElementById('calPrev').addEventListener('click', () => {
      current.setMonth(current.getMonth() - 1); selectedDay = null; renderCal();
    });
    document.getElementById('calNext').addEventListener('click', () => {
      current.setMonth(current.getMonth() + 1); selectedDay = null; renderCal();
    });
    renderCal();
  }

  /* --- Formulario de agendar cita --- */
  const apptForm = document.getElementById('apptForm');
  if (apptForm) {
    apptForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!apptForm.checkValidity()) {
        apptForm.classList.add('was-validated');
        return;
      }
      document.getElementById('confirmEmpty').style.display = 'none';
      document.getElementById('confirmBox').style.display = 'block';
      apptForm.classList.remove('was-validated');
    });
  }

});
