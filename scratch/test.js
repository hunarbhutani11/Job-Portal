const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, LevelFormat, UnderlineType
} = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, bold: true, size: 32, color: "1E1E2E" })]
  });
}

function heading2(text, color = "2D2D44") {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, size: 26, color })]
  });
}

function heading3(text) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 22, color: "444466" })]
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 20, color: "222222", ...opts })]
  });
}

function code(text) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    indent: { left: 400 },
    children: [new TextRun({ text, font: "Courier New", size: 18, color: "8B0000" })]
  });
}

function labelVal(label, val) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({ text: label + ": ", bold: true, size: 20, color: "111111" }),
      new TextRun({ text: val, size: 20, color: "333333" })
    ]
  });
}

function severityRow(sev) {
  const colors = { CRITICAL: "C0392B", HIGH: "E67E22", MEDIUM: "2980B9", LOW: "27AE60", IMPROVEMENT: "8E44AD" };
  const col = colors[sev] || "555555";
  return new TextRun({ text: sev, bold: true, size: 20, color: col });
}

function divider() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" } },
    children: [new TextRun("")]
  });
}

function bugTable(bugData) {
  const headerShade = { fill: "2D2D44", type: ShadingType.CLEAR };
  const altShade = { fill: "F4F4F8", type: ShadingType.CLEAR };

  const headerRow = new TableRow({
    tableHeader: true,
    children: ["#", "File / Location", "Bug Description", "Severity", "Type"].map((h, i) => {
      const widths = [400, 2200, 3800, 900, 1060];
      return new TableCell({
        borders,
        width: { size: widths[i], type: WidthType.DXA },
        shading: headerShade,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 18, color: "FFFFFF" })] })]
      });
    })
  });

  const dataRows = bugData.map((bug, i) => {
    const shade = i % 2 === 0 ? { fill: "FFFFFF", type: ShadingType.CLEAR } : altShade;
    const widths = [400, 2200, 3800, 900, 1060];
    const vals = [String(i + 1), bug.file, bug.description, bug.severity, bug.type];
    return new TableRow({
      children: vals.map((v, ci) => new TableCell({
        borders,
        width: { size: widths[ci], type: WidthType.DXA },
        shading: shade,
        margins: { top: 70, bottom: 70, left: 100, right: 100 },
        children: [new Paragraph({
          children: ci === 3
            ? [severityRow(v)]
            : [new TextRun({ text: v, size: 18, color: ci === 0 ? "666666" : "222222" })]
        })]
      }))
    });
  });

  return new Table({
    width: { size: 8360, type: WidthType.DXA },
    columnWidths: [400, 2200, 3800, 900, 1060],
    rows: [headerRow, ...dataRows]
  });
}

const bugs = [
  { file: "Navbar.jsx", description: "axios.post logout has withCredentials inside the data body instead of config object", severity: "CRITICAL", type: "Logic Bug" }
];

const improvementItems = [
  { area: "JobDescription.jsx", fix: "Wrap the entire detail section in a dark card matching the rest of the app." }
];

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 20 } }
    },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1E1E2E" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2D2D44" },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 1 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    children: [
      heading1("1. Executive Summary")
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/user-data/outputs/Job-Portal-Bug-Report.docx", buffer);
  console.log("✅ Bug report generated successfully!");
}).catch(e => console.error(e));
