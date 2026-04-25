const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const inputPath = path.join(root, "MinerU_markdown_手册_2048016547323379712.md");
const outputPath = path.join(root, "manual-content.js");

const meta = {
  title: "莱比锡留学生生活办事手册",
  edition: "2026 版",
  publisher: "莱比锡学联（CSSA）联合编撰",
  updatedLabel: "信息更新于 2026 年 4 月",
  disclaimer:
    "政策、费用、办公时间和商户信息可能变化，办理前请以官方网站或机构现场说明为准。",
  sources: [
    {
      label: "Studentenwerk Leipzig：Deutschland-Semesterticket",
      url: "https://www.studentenwerk-leipzig.de/mobilitaet/semesterticket/",
    },
    {
      label: "Rundfunkbeitrag：住户广播电视费",
      url: "https://www.rundfunkbeitrag.de/buergerinnen_und_buerger/informationen/zahlung/index_ger.html",
    },
    {
      label: "Leipzig 外管局：学习目的居留许可",
      url: "https://english.leipzig.de/youth-family-and-community/foreign-nationals-and-migrants/foreigners-authority/residence-for-training-and-study-purposes/residence-permit-for-a-study-course",
    },
    {
      label: "Make it in Germany：国际学生工作时长",
      url: "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/work",
    },
    {
      label: "TK：2026 学生医保费用",
      url: "https://www.tk.de/en/become-a-member/join-tk/contribution-foreign-students-german-health-insurance-2038022",
    },
  ],
  visuals: {
    chapters: {
      "chapter-1": {
        src: "https://images.unsplash.com/photo-1742152554665-a3b1eb19e59d?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1800",
        alt: "莱比锡市中心街道上的行人与自行车",
        caption: "市中心的日常节奏",
        credit: "Ben Kupke / Unsplash",
        creditUrl:
          "https://unsplash.com/photos/people-crowd-a-city-street-in-broad-daylight-aj5UJLE3H-8",
      },
      "chapter-2": {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/20090314055DR%20Leipzig%20Augustusplatz%20Paulinum%20%2B%20Mende-Brunnen.jpg?width=1800",
        alt: "莱比锡大学 Paulinum 与 Augustusplatz 校园建筑",
        caption: "Augustusplatz 校园与 Paulinum",
        credit: "Dirk Goldhahn / CC BY-SA 4.0, Wikimedia Commons",
        creditUrl:
          "https://commons.wikimedia.org/wiki/File:20090314055DR_Leipzig_Augustusplatz_Paulinum_%2B_Mende-Brunnen.jpg",
      },
      "chapter-3": {
        src: "https://images.unsplash.com/photo-1742734068847-f405a6e6f228?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1800",
        alt: "莱比锡新市政厅尖塔与蓝天",
        caption: "登记、签证与城市办事",
        credit: "Beth K. / Unsplash",
        creditUrl:
          "https://unsplash.com/photos/the-leipzig-city-hall-rises-towards-a-blue-sky-bLa3GZER8-U",
      },
      "chapter-4": {
        src: "https://images.unsplash.com/photo-1742306239437-202f4ace6159?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1800",
        alt: "莱比锡 Barthels Hof 历史院落与建筑细节",
        caption: "老城院落与居住尺度",
        credit: "Leipzig Tours / Unsplash",
        creditUrl:
          "https://unsplash.com/photos/a-courtyard-with-beautiful-and-detailed-buildings-qa15K0tWiSA",
      },
      "chapter-5": {
        src: "https://images.unsplash.com/photo-1761150512223-e48ee904d15c?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1800",
        alt: "莱比锡晴天街道上的自行车、电车与行人",
        caption: "工作日的街道流动",
        credit: "Alain ROUILLER / Unsplash",
        creditUrl:
          "https://unsplash.com/photos/people-and-vehicles-on-a-sunny-city-street-W5zOT9lik44",
      },
      "chapter-6": {
        src: "https://images.unsplash.com/photo-1706863111857-d7e2bf93b3cb?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1800",
        alt: "莱比锡 Augustusplatz Gewandhaus 与广场水面",
        caption: "Augustusplatz 与日常消费半径",
        credit: "Leipzig Tours / Unsplash",
        creditUrl:
          "https://unsplash.com/photos/a-group-of-people-standing-outside-of-a-building-next-to-a-body-of-water-bEMQUanItEs",
      },
      "chapter-7": {
        src: "https://images.unsplash.com/photo-1592148790400-db075b742582?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1800",
        alt: "莱比锡街边露台上交谈的人们",
        caption: "街边露台与城市餐桌",
        credit: "Miikka Luotio / Unsplash",
        creditUrl:
          "https://unsplash.com/photos/grayscale-photo-of-people-walking-on-street-FVHxrNGk4os",
      },
      "chapter-8": {
        src: "https://images.unsplash.com/photo-1761150512118-30266817be86?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1800",
        alt: "莱比锡有轨电车站台与上下车乘客",
        caption: "电车站台与日常通勤",
        credit: "Alain ROUILLER / Unsplash",
        creditUrl:
          "https://unsplash.com/photos/people-boarding-tram-at-a-sunny-street-stop-ZD0DAy1J6-U",
      },
      "chapter-9": {
        src: "https://images.unsplash.com/photo-1706863112008-a62bd189a675?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1800",
        alt: "莱比锡街头蓝黄色有轨电车",
        caption: "紧急时刻的城市连接",
        credit: "Leipzig Tours / Unsplash",
        creditUrl:
          "https://unsplash.com/photos/a-yellow-and-blue-trolley-on-a-city-street-HTn79W4g9Yo",
      },
    },
    sections: {
      "3.1 市政厅住址登记": {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Neues%20Rathaus%20Leipzig%2001.jpg?width=1600",
        alt: "莱比锡新市政厅外立面",
        caption: "登记与城市行政入口",
        credit: "Helmlechner / CC0, Wikimedia Commons",
        creditUrl:
          "https://commons.wikimedia.org/wiki/File:Neues_Rathaus_Leipzig_01.jpg",
      },
      "3.4 延签、材料及政策": {
        src: "https://images.unsplash.com/photo-1742410098143-a4ed640ed392?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1600",
        alt: "莱比锡民族大会战纪念碑与水面",
        caption: "重要材料先建立清单",
        credit: "Leipzig Tours / Unsplash",
        creditUrl:
          "https://unsplash.com/photos/the-monument-to-the-battle-of-the-nations-stands-tall--shpN2I5vI0",
      },
      "4.1 租房类型及租金市场": {
        src: "https://images.unsplash.com/photo-1662028598643-696e751dd9fe?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1600",
        alt: "莱比锡 Werk 2 红砖街区与院落",
        caption: "街区气质影响居住体验",
        credit: "Nico Knaack / Unsplash",
        creditUrl:
          "https://unsplash.com/photos/a-brick-street-with-a-covered-walkway-Htn01B8ffOo",
      },
      "6.2 主要购物场所": {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Leipzig%2C%20M%C3%A4dler-Passage%20--%201980.jpg?width=1600",
        alt: "莱比锡 Mädlerpassage 拱廊商业空间",
        caption: "市中心购物可从 Passage 认识",
        credit: "XRay / CC BY-SA 4.0, Wikimedia Commons",
        creditUrl:
          "https://commons.wikimedia.org/wiki/File:Leipzig,_M%C3%A4dler-Passage_--_1980.jpg",
      },
      "7.2 咖啡馆": {
        src: "https://images.unsplash.com/photo-1742152551862-92a334adabe9?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1600",
        alt: "莱比锡公园草地上休息的人群",
        caption: "晴天适合把聚会带到户外",
        credit: "Ben Kupke / Unsplash",
        creditUrl:
          "https://unsplash.com/photos/people-relax-by-a-park-on-a-sunny-day-t2O828upyK4",
      },
      "8.1 学期票 (Deutschland-Semesterticket)": {
        src: "https://images.unsplash.com/photo-1742152549707-83b856347ba9?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=72&w=1600",
        alt: "莱比锡站台上的蓝黄色有轨电车",
        caption: "学期票的核心价值是日常通勤",
        credit: "Ben Kupke / Unsplash",
        creditUrl:
          "https://unsplash.com/photos/a-yellow-and-blue-tram-at-a-station-N9jfnuN70rw",
      },
      "9.4 急诊处理": {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Universit%C3%A4tsklinikum%20Leipzig%20Pathologie%2C%20Liebigstra%C3%9Fe.jpg?width=1600",
        alt: "莱比锡大学医院 Liebigstraße 院区建筑",
        caption: "急诊路径提前记住地址与电话",
        credit: "Mister No / CC BY 3.0, Wikimedia Commons",
        creditUrl:
          "https://commons.wikimedia.org/wiki/File:Universit%C3%A4tsklinikum_Leipzig_Pathologie,_Liebigstra%C3%9Fe.jpg",
      },
    },
  },
};

const highlights = {
  "3.1 市政厅住址登记": [
    "迁入后通常需在两周内完成住址登记。",
    "核心材料是护照、住房提供者证明和登记表；具体预约与等候情况以 Bürgerbüro 官方页面为准。",
    "登记证明后续常用于银行开户、延签、医保和学校手续。",
  ],
  "3.3 购买医疗保险": [
    "学生需要提供合规医保；公保、私保和豁免规则取决于年龄、学籍和既有保险状态。",
    "TK 2026 学生公保总额示例：23 岁以下或有子女为 141.16 欧/月，23 岁以上无子女为 146.29 欧/月。",
    "不同 Krankenkasse 的 Zusatzbeitrag 会变化，办理前应查看所选保险公司官网。",
  ],
  "3.4 延签、材料及政策": [
    "学生居留通常对应 §16b AufenthG，延签应在到期前尽早处理。",
    "非欧盟学生一般可在无需额外许可的情况下每年工作 140 个全天或 280 个半天。",
    "资金证明金额以最新官方要求为准；2026 年常见标准为 992 欧/月、11,904 欧/年。",
  ],
  "4.3 德国广电局媒体费 (Rundfunkbeitrag / GEZ)": [
    "2026 年 4 月官方标准为每户每月 18.36 欧，法定三个月缴费为 55.08 欧。",
    "WG 通常按整套住房缴纳一份，室友之间再内部平摊。",
    "是否可豁免取决于德国社会福利等条件，普通学生身份本身通常不自动豁免。",
  ],
  "5.1 合法打工时长政策与税务": [
    "第三国学生每年 140 个全天或 280 个半天是核心工作时长边界。",
    "单日工作不超过 4 小时通常按半天计算。",
    "超过额度或涉及自雇、自由职业前，应先确认是否需要外管局许可。",
  ],
  "8.1 学期票 (Deutschland-Semesterticket)": [
    "2026/27 冬季学期起，莱比锡 Deutschland-Semesterticket 为 226.80 欧/学期。",
    "该票为参与高校的团结制 Pflichtbeitrag，随注册或 Rückmeldung 缴纳。",
    "学生证本身不等于乘车凭证，需按当前说明激活电子票。",
  ],
  "8.2 全国通用交通票 (Deutschlandticket)": [
    "2026 年常规 Deutschlandticket 为 63 欧/月。",
    "通常为订阅制，购买和取消期限以销售方规则为准。",
    "适合尚未拿到学期票、休学或不在学期票覆盖状态的阶段性需求。",
  ],
  "9.4 急诊处理": [
    "危及生命或重大事故拨打 112。",
    "夜间、周末的非生命危险急症可联系 116117 或前往 Bereitschaftspraxis。",
    "前往诊所或急诊时尽量携带医保卡和身份证件。",
  ],
};

function cleanMarkdown(markdown) {
  const normalized = markdown
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/Bu ̈rgebüro/g, "Bürgerbüro")
    .replace(/Bürgebüro/g, "Bürgerbüro")
    .replace(/Bürogeramt/g, "Bürgeramt")
    .replace(/Bürgeramt/g, "Bürgeramt")
    .replace(/Über-weisung/g, "Überweisung")
    .replace(/Immatrikulations-bescheinigung/g, "Immatrikulationsbescheinigung")
    .replace(/einerbefristeten/g, "einer befristeten")
    .replace(/\$1 9 \\%\$/g, "19%")
    .replace(
      /http:\/\/www\.uni-leipzig\.de\/stksachs\/studium\/kurse\.html/g,
      "https://www.uni-leipzig.de/studienkolleg-sachsen",
    )
    .replace(
      /https:\/\/english\.leipzig\.de ·16B 学生签居留证申请链接：https:\/\/english\.leipzig\.de\/youth-family-and-community\/foreign-nationals-and-migrants\/foreigners-authority\/residence-for-train\s*\n\s*ing-and-study-purposes\/residence-permit-for-a-study-course#c223339/g,
      "外管局官网：https://english.leipzig.de · 16B 学生签居留证申请入口：https://english.leipzig.de/youth-family-and-community/foreign-nationals-and-migrants/foreigners-authority/residence-for-training-and-study-purposes/residence-permit-for-a-study-course",
    )
    .replace(
      /2026 年的现行法定标准为 每户每月18\.36 欧元/g,
      "2026 年 4 月的官方标准为每户每月 18.36 欧元",
    )
    .replace(
      /未满 30 周岁的大学生必须购买公立医保/g,
      "未满 30 周岁的大学生通常可以加入学生公立医保，也可以在符合条件时选择或保留合规私保",
    )
    .replace(
      /区域性巨头 AOK PLUS 保费也在 127-130欧元以上浮动。/g,
      "AOK PLUS 等保险公司的最终金额会随附加费率与护理险条件变化，办理前请查看所选保险公司官网。",
    )
    .replace(
      /【2026 年保费暴涨预警】因医疗系统财务压力，公共医疗保险（基础医疗费与强制性长期护理险合并）近期有明显涨幅。/g,
      "2026 年起，学生公保费用有所上调。",
    )
    .replace(/已高达 146\.29欧元/g, "为 146.29 欧元")
    .replace(
      /这笔每年超 1700 欧元的强制定额支出必须成为您留德财务规划的重中之重。/g,
      "建议把医保费用纳入年度预算。",
    )
    .replace(
      /全面执行极其严格的“纯预约制”。业务办理必须强制作线上在线申请。/g,
      "以在线申请和预约办理为主。",
    )
    .replace(
      /绝不接受突击上门排队碰运气。/g,
      "是否接受现场办理请以官方页面和现场公告为准。",
    )
    .replace(/# 预约制警告：无预约不办事！/g, "# 预约与在线申请提示")
    .replace(
      /直接面临政府催缴罚款加码，并严重影响个人的在德信用记录（Schufa）/g,
      "可能收到催缴、滞纳处理或强制执行通知",
    )
    .replace(
      /一顿极尽普通的单人份简餐已大概率逼近甚至突破 20欧元大关/g,
      "餐厅单人简餐价格明显上涨，市中心热门餐厅常见消费可能接近或超过 20 欧元",
    )
    .replace(/强制性捆绑销售并执行“团结统筹模式”的学期票/g, "以团结制统一缴纳的学期票")
    .replace(/将近 300 至 400 欧元的闲置现金流！/g, "相应的学期注册预算。")
    .replace(/# 2026 餐饮通胀红色预警/g, "# 2026 餐饮价格提示")
    .replace(
      /由于德国餐饮堂食增值税（MwSt\.）硬着陆全面恢复至 19% ，加上供应链断裂推高的农产品及工资暴涨。/g,
      "德国餐饮堂食增值税（MwSt.）恢复至 19%，叠加食材、人工等成本变化。",
    )
    .replace(
      /高频“下馆子外出就餐”将直接透支您的日常现金流，为了确保长期的留德财务乃至身体健康，自己动手做饭（Selbstkochen）才是硬道理和最佳防线！/g,
      "如果预算有限，建议把外出就餐控制在可承受频率，日常以自己做饭（Selbstkochen）为主。",
    )
    .replace(
      /强制许可警告：若超出上述法定工作天数，必须获得外管局的特别书面许可，否则属于违法行为，可能面临巨额罚金乃至签证被注销遣返的严重后果！/g,
      "如需超过上述工作天数，应先取得外管局的特别书面许可，否则可能影响居留状态。",
    );

  const lines = normalized.split("\n");
  const chapterStarts = lines
    .map((line, index) => (line.trim() === "# 第一章 城市介绍" ? index : -1))
    .filter((index) => index >= 0);
  const chapterStartIndex = chapterStarts[1] ?? chapterStarts[0];
  return lines.slice(chapterStartIndex >= 0 ? chapterStartIndex : 0).join("\n");
}

function parseSections(markdown) {
  const sections = [];
  let current = null;

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();
    if (!line) {
      if (current) current.lines.push("");
      continue;
    }

    const heading = line.match(/^#\s+(.+)$/);
    if (heading) {
      const title = normalizeTitle(heading[1]);
      const level = inferHeadingLevel(title);
      current = {
        id: level === 1 ? `chapter-${chapterNumber(title, sections.length)}` : createId(title, sections.length),
        title,
        level,
        lines: [],
      };
      sections.push(current);
      continue;
    }

    if (current) current.lines.push(rawLine);
  }

  const filtered = sections.filter(
    (section) => section.level <= 2 || section.lines.some((line) => line.trim()),
  );
  return addChapterOverviews(filtered.map((section) => toStructuredSection(section)));
}

function inferHeadingLevel(title) {
  if (/^第.+章/.test(title)) return 1;
  if (/^\d+\.\d+\s+/.test(title)) return 2;
  return 3;
}

function toStructuredSection(section) {
  const blocks = [];
  const visual =
    section.level === 1 ? meta.visuals.chapters[section.id] : meta.visuals.sections[section.title];
  if (visual) {
    blocks.push({ type: "visual", ...visual });
  }
  const keyPoints = highlights[section.title];
  if (keyPoints) {
    blocks.push({ type: "keypoints", title: "本节重点", items: keyPoints });
  }

  blocks.push(...linesToBlocks(section.lines));
  return {
    id: section.id,
    title: section.title,
    level: section.level,
    blocks,
    text: blocksToText(blocks),
  };
}

function addChapterOverviews(sections) {
  return sections.map((section, index) => {
    if (section.level !== 1) return section;

    const children = [];
    for (let i = index + 1; i < sections.length && sections[i].level !== 1; i += 1) {
      if (sections[i].level === 2 && /^\d+\.\d+/.test(sections[i].title)) children.push(sections[i].title);
    }

    if (!children.length) return section;

    return {
      ...section,
      blocks: [{ type: "overview", title: "本章导读", items: children.slice(0, 8) }, ...section.blocks],
      text: `${children.join(" ")} ${section.text}`,
    };
  });
}

function linesToBlocks(lines) {
  const blocks = [];
  let paragraph = [];
  let list = [];
  let table = [];

  const flushParagraph = () => {
    const text = paragraph.join(" ").replace(/\s+/g, " ").trim();
    if (text) blocks.push({ type: "paragraph", text });
    paragraph = [];
  };

  const flushList = () => {
    if (list.length) blocks.push({ type: "list", items: list });
    list = [];
  };

  const flushTable = () => {
    if (table.length) blocks.push({ type: "table", html: normalizeTableHtml(table.join("\n")) });
    table = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (table.length) {
      table.push(line);
      if (line.includes("</table>")) flushTable();
      continue;
    }

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("<table")) {
      flushParagraph();
      flushList();
      table.push(line);
      if (line.includes("</table>")) flushTable();
      continue;
    }

    const listMatch = line.match(/^(?:[•·*]|[-])\s*(.+)$/);
    const orderedMatch = line.match(/^\d+[、.]\s*(.+)$/);
    if (listMatch || orderedMatch) {
      flushParagraph();
      list.push((listMatch || orderedMatch)[1].trim());
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  flushTable();
  return blocks;
}

function normalizeTableHtml(html) {
  if (html.includes("首次申请 16B 居留许可材料")) return residencePermitMaterialsTable();
  return html.replace(/\s+/g, " ").trim();
}

function residencePermitMaterialsTable() {
  const firstApplication = [
    "学习课程说明（详情参考官网）",
    "完整填写的居留许可申请表",
    "市政厅（Bürgeramt）登记证明",
    "有效护照及入境签证",
    "符合德国生物识别标准的护照照片",
    "资金证明及复印件（如 Sperrkonto）",
    "医疗保险证明及复印件",
    "住房合同及复印件",
    "大学注册证明（Immatrikulationsbescheinigung）",
  ];
  const extension = [
    "完整填写的延签申请表格",
    "市政厅（Bürgeramt）登记证明",
    "有效护照及护照照片",
    "资金证明及复印件",
    "医疗保险证明及复印件",
    "住房合同及复印件",
    "最新学期的大学注册证明",
    "如有：变更学习目的之推荐信",
    "如有：45 岁以上需养老保险证明",
  ];
  const listHtml = (items) => `<ul>${items.map((item) => `<li>${escapeInlineHtml(item)}</li>`).join("")}</ul>`;

  return `
    <table class="materials-table">
      <thead>
        <tr>
          <th>首次申请 16B 居留许可材料</th>
          <th>延长 16B 居留许可材料</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${listHtml(firstApplication)}</td>
          <td>${listHtml(extension)}</td>
        </tr>
        <tr class="fee-row">
          <td><strong>基础费用：</strong>100 欧元</td>
          <td><strong>基础费用：</strong>93 欧元</td>
        </tr>
      </tbody>
    </table>
  `;
}

function escapeInlineHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function blocksToText(blocks) {
  return blocks
    .map((block) => {
      if (block.text) return block.text;
      if (block.items) return block.items.join(" ");
      if (block.html) return block.html.replace(/<[^>]+>/g, " ");
      return "";
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeTitle(title) {
  return title.replace(/\s+/g, " ").replace(/\s+\./g, ".").trim();
}

function chapterNumber(title, fallback) {
  const numerals = "一二三四五六七八九十";
  const match = title.match(/^第([一二三四五六七八九十]+)章/);
  if (!match) return fallback + 1;
  if (match[1] === "十") return 10;
  return numerals.indexOf(match[1][0]) + 1;
}

function createId(title, index) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "section"}-${index + 1}`;
}

const markdown = fs.readFileSync(inputPath, "utf8");
const content = {
  meta,
  sections: parseSections(cleanMarkdown(markdown)),
};

fs.writeFileSync(
  outputPath,
  `window.MANUAL_CONTENT = ${JSON.stringify(content, null, 2)};\n`,
  "utf8",
);

console.log(`Wrote ${path.relative(root, outputPath)} with ${content.sections.length} sections.`);
