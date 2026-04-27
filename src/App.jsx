import { useState, useMemo, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const TEAMS_DATA = [{"name":"ARABIAN KNIGHTS","gkClub":"Everton","players":[{"name":"KINGSLEY","club":"Hearts","position":"DEF"},{"name":"GRAHAM","club":"Dundee Utd","position":"DEF"},{"name":"CARTER VICKERS","club":"Celtic","position":"DEF"},{"name":"SUMMERVILLE","club":"West Ham","position":"MID"},{"name":"NYGREN","club":"Celtic","position":"MID"},{"name":"PHILLIPS","club":"Barnsley","position":"MID"},{"name":"CANTWELL","club":"Blackburn R","position":"MID"},{"name":"BROWNE","club":"Barnet","position":"ATT"},{"name":"STEWART","club":"Southampton","position":"ATT"},{"name":"ONE","club":"Lincoln City","position":"ATT"},{"name":"CHERMITI","club":"Rangers","position":"ATT"},{"name":"CVANCARA","club":"Celtic","position":"ATT"},{"name":"DALBY","club":"Bolton","position":"ATT"}]},{"name":"AS CONACO","gkClub":"Sunderland","players":[{"name":"CLEWORTH","club":"Wrexham","position":"DEF"},{"name":"GARBUTT","club":"Salford City","position":"DEF"},{"name":"LONGELO","club":"Motherwell","position":"DEF"},{"name":"SALAH","club":"Liverpool","position":"MID"},{"name":"FERNANDEZ","club":"Chelsea","position":"MID"},{"name":"BROWNE","club":"AFC Wimbledon","position":"MID"},{"name":"HACKETT","club":"Lincoln City","position":"MID"},{"name":"PHILLIPS","club":"St Mirren","position":"ATT"},{"name":"MARMOUSH","club":"Man City","position":"ATT"},{"name":"NOMBE","club":"Rotherham","position":"ATT"},{"name":"GUDJOHNSEN","club":"Blackburn R","position":"ATT"},{"name":"MANDRON","club":"St Mirren","position":"ATT"},{"name":"STEWART","club":"Falkirk","position":"ATT"}]},{"name":"BIG AL HILAL","gkClub":"Crystal Palace","players":[{"name":"SHIPLEY","club":"Barrow","position":"DEF"},{"name":"COLLINGE","club":"Barnet","position":"DEF"},{"name":"WEIR","club":"Walsall","position":"DEF"},{"name":"BOYLE","club":"Hibernian","position":"MID"},{"name":"TROSSARD","club":"Arsenal","position":"MID"},{"name":"BELL","club":"Bristol City","position":"MID"},{"name":"NETO","club":"Chelsea","position":"MID"},{"name":"PRICE","club":"West Brom","position":"ATT"},{"name":"GELHARDT","club":"Hull City","position":"ATT"},{"name":"OSENI","club":"Plymouth Arg","position":"ATT"},{"name":"KJERRUMGAARD","club":"Watford","position":"ATT"},{"name":"WELBECK","club":"Brighton","position":"ATT"},{"name":"MOORE","club":"Wrexham","position":"ATT"}]},{"name":"BLACKBUM GROPERS","gkClub":"Bournemouth","players":[{"name":"VAN DE VEN","club":"Spurs","position":"DEF"},{"name":"SMITH","club":"Tranmere","position":"DEF"},{"name":"SOUTTAR","club":"Sheffield Utd","position":"DEF"},{"name":"POKU","club":"QPR","position":"MID"},{"name":"MOUNT","club":"Man Utd","position":"MID"},{"name":"KEMP","club":"Stevenage","position":"MID"},{"name":"HALL","club":"Notts County","position":"MID"},{"name":"ADELAKUN","club":"Doncaster","position":"ATT"},{"name":"MADDEN","club":"Accrington S","position":"ATT"},{"name":"GYOKERES","club":"Arsenal","position":"ATT"},{"name":"MAGENNIS","club":"Exeter City","position":"ATT"},{"name":"AGYEMANG","club":"Derby County","position":"ATT"},{"name":"NDLOVU","club":"Barnet","position":"ATT"}]},{"name":"BLUE STREAKS","gkClub":"Huddersfield","players":[{"name":"POLLOCK","club":"Watford","position":"DEF"},{"name":"KONSA","club":"Aston Villa","position":"DEF"},{"name":"HORSFALL","club":"Blackpool","position":"DEF"},{"name":"QUITIRNA","club":"Wycombe","position":"MID"},{"name":"COLLAR","club":"MK Dons","position":"MID"},{"name":"DIBLING","club":"Everton","position":"MID"},{"name":"MASON-CLARK","club":"Coventry","position":"MID"},{"name":"CLARK","club":"Luton Town","position":"ATT"},{"name":"ENNIS","club":"Blackpool","position":"ATT"},{"name":"DWYER","club":"Mansfield Town","position":"ATT"},{"name":"McATEE","club":"Bolton","position":"ATT"},{"name":"VARDY","club":"Leicester","position":"ATT"},{"name":"AKPOM","club":"Ipswich Town","position":"ATT"}]},{"name":"CALBION ROVERS","gkClub":"Chelsea","players":[{"name":"BURROWS","club":"Sheffield Utd","position":"DEF"},{"name":"FERNANDES","club":"Rangers","position":"DEF"},{"name":"DARLING","club":"Norwich City","position":"DEF"},{"name":"POINTON","club":"Bradford City","position":"MID"},{"name":"SHADE","club":"Burton Albion","position":"MID"},{"name":"TWINE","club":"Bristol City","position":"MID"},{"name":"KELLYMAN","club":"Cardiff City","position":"MID"},{"name":"STEVENS","club":"Oldham Ath","position":"ATT"},{"name":"RAYAN","club":"Bournemouth","position":"ATT"},{"name":"WAREHAM","club":"Exeter City","position":"ATT"},{"name":"T-ASANTE","club":"Coventry","position":"ATT"},{"name":"ZIPOTNIK","club":"Swansea City","position":"ATT"},{"name":"SIDIBEH","club":"Stockport Co","position":"ATT"}]},{"name":"DYNAMO MIKSO","gkClub":"Coventry","players":[{"name":"GVARDIOL","club":"Man City","position":"DEF"},{"name":"O'CONNOR","club":"Reading","position":"DEF"},{"name":"GABRIEL","club":"Arsenal","position":"DEF"},{"name":"MORLEY","club":"Wycombe","position":"MID"},{"name":"GILBEY","club":"MK Dons","position":"MID"},{"name":"MOTHERSILLE","club":"Stockport Co","position":"MID"},{"name":"KOUHYAR","club":"Notts County","position":"MID"},{"name":"WATTS","club":"Plymouth","position":"ATT"},{"name":"JATTA","club":"Notts County","position":"ATT"},{"name":"CONWAY","club":"Middlesbrough","position":"ATT"},{"name":"WOOTON","club":"Stockport Co","position":"ATT"},{"name":"PEPPLE","club":"Plymouth","position":"ATT"},{"name":"WATTERS","club":"Dundee Utd","position":"ATT"}]},{"name":"ECKSPANYOL","gkClub":"Stevenage","players":[{"name":"ROBERTSON","club":"Dundee","position":"DEF"},{"name":"MEDLEY","club":"Bromley","position":"DEF"},{"name":"MUNOZ","club":"Crystal Palace","position":"DEF"},{"name":"THOMPSON","club":"Bromley","position":"MID"},{"name":"EZE","club":"Arsenal","position":"MID"},{"name":"AASGAARD","club":"Rangers","position":"MID"},{"name":"FODEN","club":"Man City","position":"MID"},{"name":"RICE","club":"Arsenal","position":"ATT"},{"name":"MUBAMA","club":"Stoke City","position":"ATT"},{"name":"HAVERTZ","club":"Arsenal","position":"ATT"},{"name":"MBICK","club":"Colchester","position":"ATT"},{"name":"McGOLDRICK","club":"Barnsley","position":"ATT"},{"name":"SHANKLAND","club":"Hearts","position":"ATT"}]},{"name":"FATZIO","gkClub":"St Mirren","players":[{"name":"TAVERNIER","club":"Rangers","position":"DEF"},{"name":"VAN DIJK","club":"Liverpool","position":"DEF"},{"name":"DUNK","club":"Brighton","position":"DEF"},{"name":"CHERKI","club":"Man City","position":"MID"},{"name":"BOWEN","club":"West Ham","position":"MID"},{"name":"MOLYNEUX","club":"Doncaster","position":"MID"},{"name":"KEVIN","club":"Fulham","position":"MID"},{"name":"CROOKS","club":"Hull City","position":"ATT"},{"name":"JESUS","club":"Arsenal","position":"ATT"},{"name":"LOLOS","club":"Crawley Town","position":"ATT"},{"name":"MUIRHEAD","club":"Livingston","position":"ATT"},{"name":"INGS","club":"Sheffield Utd","position":"ATT"},{"name":"MORRIS","club":"Derby County","position":"ATT"}]},{"name":"STRUIJK MY LONGSTAFF","gkClub":"Motherwell","players":[{"name":"BOGLE","club":"Leeds Utd","position":"DEF"},{"name":"McCRORIE","club":"Bristol City","position":"DEF"},{"name":"KADIOUGLU","club":"Brighton","position":"DEF"},{"name":"MOORE","club":"Rangers","position":"MID"},{"name":"JONES","club":"Notts County","position":"MID"},{"name":"EL-KHANNOUSS","club":"Leicester","position":"MID"},{"name":"SZMODICS","club":"Derby County","position":"MID"},{"name":"JAMES","club":"Leeds Utd","position":"ATT"},{"name":"WISSA","club":"Newcastle","position":"ATT"},{"name":"KONE","club":"MK Dons","position":"ATT"},{"name":"HIRST","club":"Ipswich Town","position":"ATT"},{"name":"GRAY","club":"Rotherham","position":"ATT"},{"name":"CONNOLLY","club":"Leyton Orient","position":"ATT"}]},{"name":"FC KRAYNOORD","gkClub":"Arsenal","players":[{"name":"LEIGH","club":"Oxford Utd","position":"DEF"},{"name":"DARIKWA","club":"Lincoln City","position":"DEF"},{"name":"MAGUIRE","club":"Man Utd","position":"DEF"},{"name":"C-DUBERRY","club":"Bolton","position":"MID"},{"name":"LISBIE","club":"Colchester","position":"MID"},{"name":"JOHNSON","club":"Crystal Palace","position":"MID"},{"name":"MEHMETI","club":"Ipswich Town","position":"MID"},{"name":"THOMAS","club":"Stoke City","position":"ATT"},{"name":"DRINAN","club":"Swindon Town","position":"ATT"},{"name":"PATERSON","club":"MK Dons","position":"ATT"},{"name":"LEONARD","club":"Peterborough","position":"ATT"},{"name":"TAYLOR","club":"Wigan Ath","position":"ATT"},{"name":"CONNOLLY","club":"Leyton Orient","position":"ATT"}]},{"name":"INBC","gkClub":"Stoke City","players":[{"name":"FINDLAY","club":"Hearts","position":"DEF"},{"name":"SOUTTAR","club":"Rangers","position":"DEF"},{"name":"ROMERO","club":"Spurs","position":"DEF"},{"name":"BARNES","club":"Newcastle","position":"MID"},{"name":"McGRATH","club":"Hibernian","position":"MID"},{"name":"McGREGOR","club":"Celtic","position":"MID"},{"name":"SAKAMOTO","club":"Coventry","position":"MID"},{"name":"OX-C","club":"Celtic","position":"ATT"},{"name":"KVISTGARDEN","club":"Norwich City","position":"ATT"},{"name":"ADAMU","club":"Celtic","position":"ATT"},{"name":"SALECH","club":"Cardiff City","position":"ATT"},{"name":"ABRAHAM","club":"Aston Villa","position":"ATT"},{"name":"DENNIS","club":"Notts County","position":"ATT"}]},{"name":"LAS PALMAS","gkClub":"Hearts","players":[{"name":"TOWLER","club":"Lincoln City","position":"DEF"},{"name":"ROONEY","club":"Fleetwood Town","position":"DEF"},{"name":"ESSELINK","club":"Dundee Utd","position":"DEF"},{"name":"ROGERS","club":"Aston Villa","position":"MID"},{"name":"BALIKWISHA","club":"Celtic","position":"MID"},{"name":"WHITTAKER","club":"Middlesbrough","position":"MID"},{"name":"DIALLO","club":"Man Utd","position":"MID"},{"name":"BERRY","club":"Chesterfield","position":"ATT"},{"name":"WATKINS","club":"Aston Villa","position":"ATT"},{"name":"MULLIN","club":"Bradford City","position":"ATT"},{"name":"SOLANKE","club":"Spurs","position":"ATT"},{"name":"REID","club":"Stevenage","position":"ATT"},{"name":"MIOVSKI","club":"Rangers","position":"ATT"}]},{"name":"BAYER LAGERKUSEN","gkClub":"Man Utd","players":[{"name":"PASSLACK","club":"Hibernian","position":"DEF"},{"name":"SOWUNMI","club":"Bromley","position":"DEF"},{"name":"MILNE","club":"Hearts","position":"DEF"},{"name":"KAIKAI","club":"Cambridge Utd","position":"MID"},{"name":"BANKS","club":"Barnsley","position":"MID"},{"name":"SMITH","club":"Livingston","position":"MID"},{"name":"FATAH","club":"Dundee Utd","position":"MID"},{"name":"YANG","club":"Celtic","position":"ATT"},{"name":"McBURNIE","club":"Hull City","position":"ATT"},{"name":"JESUS","club":"Nott'm Forest","position":"ATT"},{"name":"BRAGA","club":"Hearts","position":"ATT"},{"name":"NISBET","club":"Aberdeen","position":"ATT"},{"name":"BONIS","club":"Chesterfield","position":"ATT"}]},{"name":"MACEY MILAN","gkClub":"Celtic","players":[{"name":"FRIMPONG","club":"Liverpool","position":"DEF"},{"name":"DJIGA","club":"Rangers","position":"DEF"},{"name":"H-BELLIS","club":"Southampton","position":"DEF"},{"name":"HUTCHISON","club":"Nott'm Forest","position":"MID"},{"name":"MAVIDIDI","club":"Leicester","position":"MID"},{"name":"C-REID","club":"Leicester","position":"MID"},{"name":"ARIBO","club":"Leicester","position":"MID"},{"name":"RASKIN","club":"Rangers","position":"ATT"},{"name":"CALVERT-LEWIN","club":"Leeds Utd","position":"ATT"},{"name":"STANSFIELD","club":"Birmingham","position":"ATT"},{"name":"SENKO","club":"Man Utd","position":"ATT"},{"name":"KEANE","club":"Reading","position":"ATT"},{"name":"ACQUAH","club":"Harrogate","position":"ATT"}]},{"name":"OOZMA KAPPA","gkClub":"Aberdeen","players":[{"name":"BOLTON","club":"Fleetwood Town","position":"DEF"},{"name":"LAVELLE","club":"Grimsby Town","position":"DEF"},{"name":"AARONS","club":"Rangers","position":"DEF"},{"name":"MILLER","club":"Falkirk","position":"MID"},{"name":"PAYNE","club":"Colchester","position":"MID"},{"name":"DIOMANDE","club":"Rangers","position":"MID"},{"name":"MULLIGAN","club":"Hibernian","position":"MID"},{"name":"ENGELS","club":"Celtic","position":"ATT"},{"name":"HAY","club":"Dundee","position":"ATT"},{"name":"GRAHAM","club":"Falkirk","position":"ATT"},{"name":"MARQUIS","club":"Shrewsbury","position":"ATT"},{"name":"DYKES","club":"Charlton Ath","position":"ATT"},{"name":"PIROE","club":"Leeds Utd","position":"ATT"}]},{"name":"PIQUE BLINDERS","gkClub":"Walsall","players":[{"name":"ROMMENS","club":"Rangers","position":"DEF"},{"name":"CASH","club":"Aston Villa","position":"DEF"},{"name":"TIERNEY","club":"Celtic","position":"DEF"},{"name":"PHILOGENE","club":"Ipswich Town","position":"MID"},{"name":"SEMENYO","club":"Man City","position":"MID"},{"name":"WILSON","club":"Fulham","position":"MID"},{"name":"KOUMAS","club":"Hull City","position":"MID"},{"name":"SZOBOSLAI","club":"Liverpool","position":"ATT"},{"name":"KROUPA","club":"Swindon Town","position":"ATT"},{"name":"FLEMMING","club":"Burnley","position":"ATT"},{"name":"PALMER","club":"Swindon Town","position":"ATT"},{"name":"YATES","club":"Sheffield Wed","position":"ATT"},{"name":"ACQUAH","club":"Harrogate","position":"ATT"}]},{"name":"PURPLE HAZE","gkClub":"Liverpool","players":[{"name":"ALLEN","club":"Wycombe","position":"DEF"},{"name":"BURKE","club":"Walsall","position":"DEF"},{"name":"HALKETT","club":"Hearts","position":"DEF"},{"name":"FERNANDES","club":"Man Utd","position":"MID"},{"name":"MBUEMO","club":"Man Utd","position":"MID"},{"name":"SKOV OLSEN","club":"Rangers","position":"MID"},{"name":"RUDONI","club":"Coventry","position":"MID"},{"name":"GASSAMA","club":"Rangers","position":"ATT"},{"name":"CUNHA","club":"Man Utd","position":"ATT"},{"name":"BALLARD","club":"Leyton Orient","position":"ATT"},{"name":"CAVEGN","club":"Bristol Rovers","position":"ATT"},{"name":"KANU","club":"Walsall","position":"ATT"},{"name":"CAMPBELL","club":"Sheffield Utd","position":"ATT"}]},{"name":"REAL SOSOBAD","gkClub":"Aston Villa","players":[{"name":"DE CUPYER","club":"Brighton","position":"DEF"},{"name":"HELIK","club":"Oxford Utd","position":"DEF"},{"name":"OGILVIE","club":"Portsmouth","position":"DEF"},{"name":"MASWANHISE","club":"Motherwell","position":"MID"},{"name":"G-WHITE","club":"Nott'm Forest","position":"MID"},{"name":"ONYEDIMA","club":"Wycombe","position":"MID"},{"name":"AZEEZ","club":"Millwall","position":"MID"},{"name":"BRANNAGAN","club":"Oxford Utd","position":"ATT"},{"name":"SAPSFORD","club":"Dundee Utd","position":"ATT"},{"name":"COBURN","club":"Millwall","position":"ATT"},{"name":"IHEANACHO","club":"Celtic","position":"ATT"},{"name":"OHASHI","club":"Blackburn R","position":"ATT"},{"name":"H-MURPHY","club":"MK Dons","position":"ATT"}]},{"name":"SAO PAOLO","gkClub":"Man City","players":[{"name":"DEVLIN","club":"Aberdeen","position":"DEF"},{"name":"TOURE","club":"Bradford City","position":"DEF"},{"name":"GILLESPIE","club":"Charlton Ath","position":"DEF"},{"name":"SCHADE","club":"Brentford","position":"MID"},{"name":"HELM","club":"Fleetwood Town","position":"MID"},{"name":"KYZIRDIS","club":"Hearts","position":"MID"},{"name":"REIJNEDERS","club":"Man City","position":"MID"},{"name":"LISBIE","club":"Peterborough","position":"ATT"},{"name":"HAALAND","club":"Man City","position":"ATT"},{"name":"HARDIE","club":"Huddersfield","position":"ATT"},{"name":"DUKSCH","club":"Birmingham","position":"ATT"},{"name":"JIMINEZ","club":"Fulham","position":"ATT"},{"name":"BAMFORD","club":"Sheffield Utd","position":"ATT"}]},{"name":"SKAISER CHIEFS","gkClub":"Cambridge","players":[{"name":"SENIOR","club":"Barnet","position":"DEF"},{"name":"OLUWO","club":"Salford City","position":"DEF"},{"name":"SESSEGNON","club":"Fulham","position":"DEF"},{"name":"McGREE","club":"Middlesbrough","position":"MID"},{"name":"FLETCHER","club":"Barrow","position":"MID"},{"name":"MOYLAN","club":"Lincoln City","position":"MID"},{"name":"BAILEY","club":"Doncaster","position":"MID"},{"name":"SEGICIC","club":"Portsmouth","position":"ATT"},{"name":"HALE","club":"Gillingham","position":"ATT"},{"name":"TSCHIMAGNGA","club":"Barnet","position":"ATT"},{"name":"SUTO","club":"Hibernian","position":"ATT"},{"name":"BEESLEY","club":"Burton Albion","position":"ATT"},{"name":"BAMFORD","club":"Sheffield Utd","position":"ATT"}]},{"name":"SPORTING ABEERGUT","gkClub":"Ipswich Town","players":[{"name":"THOMAS","club":"Coventry","position":"DEF"},{"name":"STRUIJK","club":"Leeds Utd","position":"DEF"},{"name":"VASSELL","club":"Crawley Town","position":"DEF"},{"name":"WINDASS","club":"Wrexham","position":"MID"},{"name":"McGEEHAN","club":"Northampton","position":"MID"},{"name":"PATRICK","club":"Tranmere","position":"MID"},{"name":"AGEU","club":"Hearts","position":"MID"},{"name":"DOLCEK","club":"Dundee Utd","position":"ATT"},{"name":"S-LARSEN","club":"Crystal Palace","position":"ATT"},{"name":"WRIGHT","club":"Coventry","position":"ATT"},{"name":"MURRAY","club":"Dundee","position":"ATT"},{"name":"TOLAJ","club":"Plymouth","position":"ATT"},{"name":"LANKSHEAR","club":"Oxford Utd","position":"ATT"}]},{"name":"TTA","gkClub":"Middlesbrough","players":[{"name":"ANDERSON","club":"Luton Town","position":"DEF"},{"name":"CHAMBERS","club":"Cardiff City","position":"DEF"},{"name":"CLARK","club":"Derby County","position":"DEF"},{"name":"SAKA","club":"Arsenal","position":"MID"},{"name":"GAKPO","club":"Liverpool","position":"MID"},{"name":"CLARKE","club":"Ipswich Town","position":"MID"},{"name":"GORDON","club":"Newcastle","position":"MID"},{"name":"JUST","club":"Motherwell","position":"ATT"},{"name":"KELMAN","club":"Charlton Ath","position":"ATT"},{"name":"PEDRO","club":"Chelsea","position":"ATT"},{"name":"WOOD","club":"Nott'm Forest","position":"ATT"},{"name":"KABIA","club":"Grimsby Town","position":"ATT"},{"name":"KABAMBA","club":"Bromley","position":"ATT"}]},{"name":"UBINESE","gkClub":"Rangers","players":[{"name":"BUSHIRI","club":"Hibernian","position":"DEF"},{"name":"EKPITETA","club":"MK Dons","position":"DEF"},{"name":"BRANDON","club":"Kilmarnock","position":"DEF"},{"name":"PALMER","club":"Chelsea","position":"MID"},{"name":"SPITTAL","club":"Hearts","position":"MID"},{"name":"MADDISON","club":"Spurs","position":"MID"},{"name":"ODOH","club":"Peterborough","position":"MID"},{"name":"MARTINELLI","club":"Arsenal","position":"ATT"},{"name":"MATETA","club":"Crystal Palace","position":"ATT"},{"name":"WELLS","club":"Luton Town","position":"ATT"},{"name":"IDAH","club":"Swansea City","position":"ATT"},{"name":"DANILO","club":"Nott'm Forest","position":"ATT"},{"name":"APPERE","club":"Cambridge","position":"ATT"}]},{"name":"WOODEN SPOONERS","gkClub":"Cardiff City","players":[{"name":"WILSON","club":"Livingston","position":"DEF"},{"name":"DUNNE","club":"QPR","position":"DEF"},{"name":"HENDERSON","club":"Falkirk","position":"DEF"},{"name":"MAEDA","club":"Celtic","position":"MID"},{"name":"ANDERSON","club":"Colchester","position":"MID"},{"name":"SARR","club":"Crystal Palace","position":"MID"},{"name":"WING","club":"Reading","position":"MID"},{"name":"SHELTON","club":"Barnet","position":"ATT"},{"name":"RICHARLISON","club":"Spurs","position":"ATT"},{"name":"STREET","club":"Lincoln City","position":"ATT"},{"name":"RIIS","club":"Bristol City","position":"ATT"},{"name":"FLETCHER","club":"Blackpool","position":"ATT"},{"name":"OLUSANYA","club":"Aberdeen","position":"ATT"}]},{"name":"BREAST HOMAGE ALB","gkClub":"Hibernian","players":[{"name":"JULES","club":"Rotherham","position":"DEF"},{"name":"EVANS","club":"Newport","position":"DEF"},{"name":"PORRO","club":"Spurs","position":"DEF"},{"name":"MURPHY","club":"Newcastle","position":"MID"},{"name":"WILES","club":"MK Dons","position":"MID"},{"name":"HUTCHINSON","club":"Cheltenham","position":"MID"},{"name":"MARKANDAY","club":"Chesterfield","position":"MID"},{"name":"BROADHEAD","club":"Wrexham","position":"ATT"},{"name":"THIAGO","club":"Brentford","position":"ATT"},{"name":"ORSI","club":"Crawley Town","position":"ATT"},{"name":"BARRY","club":"Everton","position":"ATT"},{"name":"KOLO MUANI","club":"Spurs","position":"ATT"},{"name":"JACKSON","club":"Unknown","position":"ATT"}]}];

const generateSampleGameweeks = () => {
  const gws = [];
  const seed = (s) => { let x = Math.sin(s) * 10000; return x - Math.floor(x); };
  for (let gw = 1; gw <= 6; gw++) {
    const scores = {};
    TEAMS_DATA.forEach((team, ti) => {
      let pts = 0;
      const playerScores = [];
      const conceded = Math.floor(seed(gw * 100 + ti) * 4);
      const gkPts = -conceded;
      playerScores.push({ name: `GK (${team.gkClub})`, goals: 0, conceded, points: gkPts, position: 'GK' });
      pts += gkPts;
      team.players.forEach((p, pi) => {
        const r = seed(gw * 1000 + ti * 50 + pi);
        let goals = 0;
        if (p.position === 'ATT') goals = r < 0.35 ? (r < 0.1 ? 2 : 1) : 0;
        else if (p.position === 'MID') goals = r < 0.2 ? 1 : 0;
        else goals = r < 0.08 ? 1 : 0;
        playerScores.push({ name: p.name, club: p.club, goals, conceded: 0, points: goals, position: p.position });
        pts += goals;
      });
      scores[team.name] = { total: pts, players: playerScores };
    });
    gws.push({ week: gw, startDate: `2025-08-${String(8 + (gw - 1) * 7).padStart(2, '0')}`, endDate: `2025-08-${String(9 + (gw - 1) * 7).padStart(2, '0')}`, scores });
  }
  return gws;
};

const GAMEWEEKS = generateSampleGameweeks();

const TEAM_COLORS = [
  '#ef4444','#f97316','#f59e0b','#eab308','#84cc16','#22c55e',
  '#10b981','#14b8a6','#06b6d4','#0ea5e9','#3b82f6','#6366f1',
  '#8b5cf6','#a855f7','#d946ef','#ec4899','#f43f5e','#fb7185',
  '#fbbf24','#a3e635','#34d399','#2dd4bf','#38bdf8','#818cf8',
  '#c084fc','#f472b6'
];

const posColor = { GK: '#e8b931', DEF: '#3b82f6', MID: '#22c55e', ATT: '#ef4444' };
const posBg = { GK: 'rgba(232,185,49,0.12)', DEF: 'rgba(59,130,246,0.12)', MID: 'rgba(34,197,94,0.12)', ATT: 'rgba(239,68,68,0.12)' };
const thStyle = { padding: '8px 10px', fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center', borderBottom: '1px solid #1e293b' };
const tdStyle = { padding: '10px 10px', fontSize: 14, background: '#111827', borderBottom: '1px solid #1e293b' };

export default function App() {
  const [view, setView] = useState('table');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedGW, setSelectedGW] = useState(GAMEWEEKS.length);
  const [gwFilter, setGwFilter] = useState(null);
  const [visibleTeams, setVisibleTeams] = useState(() => new Set(TEAMS_DATA.slice(0, 5).map(t => t.name)));

  const standings = useMemo(() => {
    const st = TEAMS_DATA.map(t => {
      let totalPts = 0;
      const gwScores = [];
      GAMEWEEKS.forEach(gw => {
        const s = gw.scores[t.name];
        if (s) { totalPts += s.total; gwScores.push(s.total); }
      });
      return { name: t.name, gkClub: t.gkClub, totalPts, gwScores, players: t.players };
    });
    st.sort((a, b) => b.totalPts - a.totalPts);
    return st;
  }, []);

  const currentGWData = GAMEWEEKS[selectedGW - 1];

  const gwStandings = useMemo(() => {
    if (!currentGWData) return [];
    return [...TEAMS_DATA].map(t => ({
      name: t.name, pts: currentGWData.scores[t.name]?.total || 0,
      players: currentGWData.scores[t.name]?.players || []
    })).sort((a, b) => b.pts - a.pts);
  }, [selectedGW, currentGWData]);

  const formChartData = useMemo(() => {
    return GAMEWEEKS.map((gw, gwi) => {
      const point = { gw: `GW${gw.week}` };
      TEAMS_DATA.forEach(t => {
        let cum = 0;
        for (let i = 0; i <= gwi; i++) cum += GAMEWEEKS[i].scores[t.name]?.total || 0;
        point[t.name] = cum;
      });
      return point;
    });
  }, []);

  const toggleTeam = useCallback((teamName) => {
    setVisibleTeams(prev => {
      const next = new Set(prev);
      if (next.has(teamName)) next.delete(teamName); else next.add(teamName);
      return next;
    });
  }, []);

  const openTeam = (teamName) => { setSelectedTeam(teamName); setView('team'); setGwFilter(null); };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const sorted = [...payload].sort((a, b) => b.value - a.value);
    return (
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', maxHeight: 280, overflowY: 'auto', fontSize: 11 }}>
        <p style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 6, fontSize: 12 }}>{label}</p>
        {sorted.map((entry, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '1px 0' }}>
            <span style={{ color: entry.color, fontWeight: 500 }}>{entry.name}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#e2e8f0' }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif", background: '#0a0f1a', color: '#e2e8f0', minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-row { animation: fadeIn 0.3s ease both; }
      `}</style>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', borderBottom: '1px solid rgba(139,92,246,0.3)', padding: '20px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #a78bfa, #e879f9, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                DAF FANTASY FOOTBALL LEAGUE
              </h1>
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>26 Teams &bull; 5 Leagues &bull; {GAMEWEEKS.length} Gameweeks</p>
            </div>
            <div style={{ display: 'flex', gap: 3, background: '#1e293b', borderRadius: 8, padding: 3 }}>
              {[['table', 'League'], ['gameweek', 'Gameweek'], ['form', 'Form']].map(([v, l]) => (
                <button key={v} onClick={() => setView(v)} style={{ padding: '7px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', background: (view === v || (view === 'team' && v === 'table')) ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : 'transparent', color: (view === v || (view === 'team' && v === 'table')) ? '#fff' : '#94a3b8', transition: 'all 0.2s' }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '20px 16px' }}>

        {/* LEAGUE TABLE */}
        {view === 'table' && (
          <div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 4px' }}>
                <thead><tr>
                  <th style={thStyle}>#</th>
                  <th style={{ ...thStyle, textAlign: 'left' }}>Team</th>
                  <th style={{ ...thStyle, textAlign: 'left', fontSize: 11 }}>GK</th>
                  {GAMEWEEKS.map(gw => <th key={gw.week} style={{ ...thStyle, width: 44 }}>GW{gw.week}</th>)}
                  <th style={{ ...thStyle, width: 60 }}>Total</th>
                </tr></thead>
                <tbody>
                  {standings.map((t, i) => (
                    <tr key={t.name} className="fade-row" style={{ animationDelay: `${i * 30}ms`, cursor: 'pointer' }} onClick={() => openTeam(t.name)}>
                      <td style={{ ...tdStyle, width: 36, textAlign: 'center', fontWeight: 700, color: i < 3 ? '#a78bfa' : i >= 23 ? '#f87171' : '#64748b', fontSize: 13, borderLeft: `3px solid ${i < 3 ? '#7c3aed' : i >= 23 ? '#ef4444' : 'transparent'}` }}>{i + 1}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>{t.name}</td>
                      <td style={{ ...tdStyle, fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>{t.gkClub}</td>
                      {t.gwScores.map((s, gi) => (
                        <td key={gi} style={{ ...tdStyle, textAlign: 'center', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: s > 0 ? '#4ade80' : s < 0 ? '#f87171' : '#64748b' }}>{s > 0 ? `+${s}` : s}</td>
                      ))}
                      <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 800, fontSize: 15, fontFamily: "'JetBrains Mono', monospace", background: 'rgba(124,58,237,0.15)', color: '#c4b5fd' }}>{t.totalPts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: 16, fontSize: 11, color: '#475569', textAlign: 'center' }}>Click any team for full squad breakdown</p>
          </div>
        )}

        {/* GAMEWEEK */}
        {view === 'gameweek' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Gameweek:</span>
              {GAMEWEEKS.map(gw => (
                <button key={gw.week} onClick={() => setSelectedGW(gw.week)} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid', borderColor: selectedGW === gw.week ? '#7c3aed' : '#334155', background: selectedGW === gw.week ? 'rgba(124,58,237,0.2)' : '#1e293b', color: selectedGW === gw.week ? '#c4b5fd' : '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit' }}>{gw.week}</button>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Fri {currentGWData?.startDate} — Sat {currentGWData?.endDate}</p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 3px' }}>
                <thead><tr>
                  <th style={thStyle}>#</th>
                  <th style={{ ...thStyle, textAlign: 'left' }}>Team</th>
                  <th style={thStyle}>Goals</th>
                  <th style={thStyle}>GK -</th>
                  <th style={{ ...thStyle, width: 70 }}>GW Pts</th>
                </tr></thead>
                <tbody>
                  {gwStandings.map((t, i) => {
                    const goals = t.players.filter(p => p.position !== 'GK').reduce((s, p) => s + p.goals, 0);
                    const conc = t.players.find(p => p.position === 'GK')?.conceded || 0;
                    return (
                      <tr key={t.name} className="fade-row" style={{ animationDelay: `${i * 25}ms`, cursor: 'pointer' }} onClick={() => openTeam(t.name)}>
                        <td style={{ ...tdStyle, width: 36, textAlign: 'center', fontWeight: 700, color: '#64748b', fontSize: 13 }}>{i + 1}</td>
                        <td style={{ ...tdStyle, fontWeight: 600, fontSize: 13 }}>{t.name}</td>
                        <td style={{ ...tdStyle, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#4ade80' }}>{goals}</td>
                        <td style={{ ...tdStyle, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#f87171' }}>{conc}</td>
                        <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 800, fontSize: 15, fontFamily: "'JetBrains Mono', monospace", color: t.pts >= 0 ? '#c4b5fd' : '#f87171', background: 'rgba(124,58,237,0.12)' }}>{t.pts > 0 ? `+${t.pts}` : t.pts}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FORM CHART */}
        {view === 'form' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Form Guide</h2>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => setVisibleTeams(new Set(TEAMS_DATA.map(t => t.name)))} style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #334155', background: '#1e293b', color: '#94a3b8', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'inherit' }}>Show All</button>
                <button onClick={() => setVisibleTeams(new Set())} style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #334155', background: '#1e293b', color: '#94a3b8', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'inherit' }}>Hide All</button>
              </div>
            </div>

            <div style={{ background: '#111827', borderRadius: 12, border: '1px solid #1e293b', padding: '20px 12px 12px 0' }}>
              <ResponsiveContainer width="100%" height={420}>
                <LineChart data={formChartData} margin={{ top: 10, right: 20, bottom: 5, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="gw" stroke="#64748b" tick={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }} label={{ value: 'Cumulative Points', angle: -90, position: 'insideLeft', style: { fill: '#475569', fontSize: 11 } }} />
                  <Tooltip content={<CustomTooltip />} />
                  {TEAMS_DATA.map((t, i) => (
                    visibleTeams.has(t.name) ? (
                      <Line key={t.name} type="monotone" dataKey={t.name} stroke={TEAM_COLORS[i]} strokeWidth={2.5} dot={{ r: 4, fill: TEAM_COLORS[i], strokeWidth: 0 }} activeDot={{ r: 6 }} />
                    ) : null
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {standings.map((t) => {
                const origIdx = TEAMS_DATA.findIndex(td => td.name === t.name);
                const color = TEAM_COLORS[origIdx];
                const active = visibleTeams.has(t.name);
                return (
                  <button key={t.name} onClick={() => toggleTeam(t.name)} style={{
                    padding: '4px 10px', borderRadius: 6, border: `2px solid ${active ? color : '#334155'}`,
                    background: active ? `${color}18` : 'transparent', color: active ? color : '#475569',
                    cursor: 'pointer', fontSize: 10, fontWeight: 600, fontFamily: 'inherit',
                    opacity: active ? 1 : 0.5, transition: 'all 0.15s', whiteSpace: 'nowrap'
                  }}>
                    <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: active ? color : '#475569', marginRight: 4, verticalAlign: 'middle' }} />
                    {t.name}
                  </button>
                );
              })}
            </div>
            <p style={{ marginTop: 10, fontSize: 11, color: '#475569' }}>Toggle teams to compare form. Hover chart for details.</p>
          </div>
        )}

        {/* TEAM DETAIL */}
        {view === 'team' && selectedTeam && (() => {
          const team = TEAMS_DATA.find(t => t.name === selectedTeam);
          if (!team) return null;
          const standing = standings.find(s => s.name === selectedTeam);
          const rank = standings.indexOf(standing) + 1;
          const activeGW = gwFilter || GAMEWEEKS.length;
          const gwData = GAMEWEEKS[activeGW - 1]?.scores[selectedTeam];
          return (
            <div>
              <button onClick={() => setView('table')} style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', fontSize: 13, fontWeight: 500, marginBottom: 16, fontFamily: 'inherit', padding: 0 }}>← Back to League Table</button>
              <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #0f172a)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{team.name}</h2>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13 }}>
                  <span><span style={{ color: '#94a3b8' }}>Position:</span> <strong style={{ color: rank <= 3 ? '#a78bfa' : '#e2e8f0' }}>#{rank}</strong></span>
                  <span><span style={{ color: '#94a3b8' }}>Total:</span> <strong style={{ color: '#c4b5fd', fontFamily: "'JetBrains Mono', monospace" }}>{standing?.totalPts}</strong></span>
                  <span><span style={{ color: '#94a3b8' }}>GK:</span> <strong>{team.gkClub}</strong></span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>GW:</span>
                {GAMEWEEKS.map(gw => (
                  <button key={gw.week} onClick={() => setGwFilter(gw.week)} style={{ padding: '4px 12px', borderRadius: 5, border: '1px solid', borderColor: activeGW === gw.week ? '#7c3aed' : '#334155', background: activeGW === gw.week ? 'rgba(124,58,237,0.2)' : 'transparent', color: activeGW === gw.week ? '#c4b5fd' : '#64748b', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'inherit' }}>{gw.week}</button>
                ))}
              </div>
              {gwData && (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 3px' }}>
                    <thead><tr>
                      <th style={{ ...thStyle, textAlign: 'left' }}>Player</th>
                      <th style={{ ...thStyle, textAlign: 'left' }}>Club</th>
                      <th style={thStyle}>Pos</th>
                      <th style={thStyle}>Goals</th>
                      <th style={thStyle}>Conc.</th>
                      <th style={thStyle}>Pts</th>
                    </tr></thead>
                    <tbody>
                      {gwData.players.map((p, i) => (
                        <tr key={i} className="fade-row" style={{ animationDelay: `${i * 30}ms` }}>
                          <td style={{ ...tdStyle, fontWeight: 600, fontSize: 13 }}>{p.name}</td>
                          <td style={{ ...tdStyle, fontSize: 12, color: '#94a3b8' }}>{p.club || ''}</td>
                          <td style={{ ...tdStyle, textAlign: 'center' }}><span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', color: posColor[p.position], background: posBg[p.position] }}>{p.position}</span></td>
                          <td style={{ ...tdStyle, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: p.goals > 0 ? '#4ade80' : '#475569' }}>{p.goals > 0 ? p.goals : '—'}</td>
                          <td style={{ ...tdStyle, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: p.conceded > 0 ? '#f87171' : '#475569' }}>{p.conceded > 0 ? p.conceded : '—'}</td>
                          <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", color: p.points > 0 ? '#4ade80' : p.points < 0 ? '#f87171' : '#475569' }}>{p.points > 0 ? `+${p.points}` : p.points === 0 ? '0' : p.points}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={5} style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, fontSize: 13, background: 'rgba(124,58,237,0.1)', borderTop: '2px solid #334155' }}>GW{activeGW} Total</td>
                        <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 800, fontSize: 16, fontFamily: "'JetBrains Mono', monospace", color: '#c4b5fd', background: 'rgba(124,58,237,0.15)', borderTop: '2px solid #334155' }}>{gwData.total > 0 ? `+${gwData.total}` : gwData.total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })()}

        <div style={{ marginTop: 32, padding: '16px 0', borderTop: '1px solid #1e293b', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: '#475569' }}>DAF Fantasy Football League &bull; Demo with simulated scores</p>
        </div>
      </div>
    </div>
  );
}
