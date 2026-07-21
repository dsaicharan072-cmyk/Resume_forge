const PDFDocument = require('pdfkit');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = docx;

exports.exportToPdf = (parsedData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      
      doc.fontSize(20).text('Resume', { align: 'center' });
      doc.moveDown();
      
      const sections = ['education', 'experience', 'projects', 'skills', 'achievements', 'certifications', 'languages', 'publications'];
      for (const section of sections) {
        if (parsedData[section] && parsedData[section].length > 0) {
          doc.fontSize(16).text(section.toUpperCase(), { underline: true });
          doc.moveDown(0.5);
          doc.fontSize(12);
          for (const item of parsedData[section]) {
            doc.text(item);
            doc.moveDown(0.5);
          }
          doc.moveDown();
        }
      }
      doc.end();
    } catch (e) {
      reject(e);
    }
  });
};

exports.exportToDocx = async (parsedData) => {
  const sections = ['education', 'experience', 'projects', 'skills', 'achievements', 'certifications', 'languages', 'publications'];
  const children = [
    new Paragraph({
      text: "Resume",
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({ text: "" })
  ];

  for (const section of sections) {
    if (parsedData[section] && parsedData[section].length > 0) {
      children.push(new Paragraph({ text: section.toUpperCase(), heading: HeadingLevel.HEADING_1 }));
      for (const item of parsedData[section]) {
        children.push(new Paragraph({
          children: [new TextRun(item)]
        }));
      }
      children.push(new Paragraph({ text: "" }));
    }
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });

  return await Packer.toBuffer(doc);
};