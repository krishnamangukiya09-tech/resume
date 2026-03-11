document.getElementById("download-pdf").addEventListener("click", async () => {
  const element = document.querySelector(".container"); // Only resume

  // Remove box-shadow; use small padding so text isn't clipped at the right edge
  const prevBoxShadow = element.style.boxShadow;
  const prevPadding = element.style.padding;
  element.style.boxShadow = 'none';
  element.style.padding = '8px';  // prevents right-edge text from being cut off

  const opt = {
    margin:       [8, 8, 8, 8],            // mm – tight margins
    filename:     'resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, logging: false, useCORS: true, scrollY: 0 },
    jsPDF:        {
      unit:       'mm',
      format:     'a4',
      orientation: 'portrait'
    },
    pagebreak:    {
      mode:       ['css', 'legacy'],
      before:     '.page-break-before',     // optional: add this class to force a new page
      after:      '.page-break-after',
      avoid:      ['li', 'h2', 'h3', 'tr'] // don't split list items or headings across pages
    }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } finally {
    element.style.boxShadow = prevBoxShadow;
    element.style.padding = prevPadding;
  }
});
