document.addEventListener('DOMContentLoaded', () => {
  // Set random referral code in footer
  const referralCodes = [
    '1nubdzm4e19021pv',
    '40204673f3',
    '9606920d73',
    '9s4nk9d67z7j786y',
    'hwx9npnmew47k7d6',
    'nxaj37gi6b4dw008'
  ];
  
  const randomReferralCode = referralCodes[Math.floor(Math.random() * referralCodes.length)];
  const referralLink = document.getElementById('windsurf-referral');
  if (referralLink) {
    referralLink.href = 'https://windsurf.com/refer?referral_code=' + randomReferralCode;
  }

  const COURSES = [
    ['<a href="https://www.youtube.com/watch?v=zutb5Clb_0Y" target="_blank">HTML</a>','2 – 4 days','None','<span class="badge bg-danger badge-opt">No</span>'],
    ['<a href="https://www.youtube.com/watch?v=-G-zic_LS0A&t=12s" target="_blank">Future FullStack CSS P1</a>','5 – 8 days','None','<span class="badge bg-danger badge-opt">No</span>'],
    ['<a href="https://www.udemy.com/course/the-complete-javascript-course/?couponCode=KEEPLEARNING" target="_blank">Jonas JavaScript Course</a>','14 – 25 days','OOP • Final Project • HTML & CSS Crash','<span class="badge bg-danger badge-opt">No</span>'],
    ['<a href="https://www.youtube.com/watch?v=1ra4yeyjFFc" target="_blank">Future FullStack CSS P2</a>','4 – 6 days','First 5 hours only','<span class="badge bg-success badge-opt">Yes</span>'],
    ['<a href="https://www.youtube.com/watch?v=zeCDuo74uzA&t=23s" target="_blank">TypeScript Huxn</a>','3 – 5 days','Skip OOP','<span class="badge bg-danger badge-opt">No</span>'],
    ['<a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU" target="_blank">Node.js Crash Course</a>','3 – 4 days','Skip OOP','<span class="badge bg-danger badge-opt">No</span>'],
    ['<a href="https://www.youtube.com/watch?v=Q6G-J54vgKc" target="_blank">Git &amp; GitHub (Big Data Arabic)</a>','2 – 4 days','None','<span class="badge bg-danger badge-opt">No</span>'],
    ['<a href="https://frontendmasters.com/courses/dev-tools-v4/" target="_blank">Web Tools v4 – Jon Kuperman</a>','3 – 4 days','None','<span class="badge bg-danger badge-opt">No</span>'],
    ['<a href="https://www.youtube.com/playlist?list=PLscJICsm7IBd7fE5FS1kfRbyCwARjVOtu" target="_blank">Ben Young AI – n8n Course</a>','1 – 2 days','Skip #8 #9 #10','<span class="badge bg-danger badge-opt">No</span>'],
    ['<a href="https://www.youtube.com/watch?v=uwAqEzhyjtw&t=865s" target="_blank">Basic Linux Commands</a>','1 – 2 days','Practice – build nodes!','<span class="badge bg-success badge-opt">Yes</span>'],
    ['<a href="https://www.youtube.com/watch?v=PrusdhS2lmo" target="_blank">Docker</a>','7+ days','8.5 h only • Skip K8s','<span class="badge bg-success badge-opt">Yes</span>'],
    ['<a href="https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/#color" target="_blank">n8n Docs – UI Elements</a>','?','Practice – build nodes!','<span class="badge bg-success badge-opt">Yes</span>']
  ];

  const tbody = document.querySelector('#learningTable tbody');

  // Helper to render rows (used in both fallback & DataTables path)
  const renderRows = (rows) => {
    tbody.innerHTML = rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
  };

  // Always render basic rows first
  renderRows(COURSES);

  // If DataTables loaded, enhance the table
  if (window.DataTable) {
    window.learningTable = new DataTable('#learningTable', {
      data: COURSES,
      columns: [
        { title: 'Course', className: 'fw-semibold' },
        { title: 'Target', className: 'text-nowrap' },
        { title: 'Skip' },
        { title: 'Optional', className: 'text-center' }
      ],
      paging: false,
      searching: true,
      info: false,
      order: [[1, 'asc']],
      responsive: true,
      language: { search: 'Filter courses:' }
    });
  } else {
    // Provide manual client‑side filter when DataTables missing
    const input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Filter courses…';
    input.className = 'form-control mb-3';
    document.querySelector('#roadmap .table-responsive').prepend(input);
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase();
      const filtered = COURSES.filter(r => r[0].toLowerCase().includes(q));
      renderRows(filtered);
    });
  }
});
