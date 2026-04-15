import { useState, useEffect, useRef } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const T = {
  bg: "#0a0c0e",
  surface: "#111518",
  card: "#161b20",
  border: "#1e262e",
  cyan: "#00d4c8",
  cyanDim: "#00d4c822",
  cyanMid: "#00d4c855",
  gold: "#f5a623",
  goldDim: "#f5a62322",
  text: "#e8f4f3",
  textMuted: "#6b8a88",
  textSub: "#3d5a58",
  red: "#ff4757",
  green: "#2ed573",
  white: "#ffffff",
};

// ─── ICONS SVG ───────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = T.cyan }) => {
  const icons = {
    bolt: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>,
    home: <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>,
    eye: <><path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/></>,
    eyeOff: <><path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" strokeLinejoin="round"/></>,
    user: <><path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/></>,
    mail: <><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/><path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4"/></>,
    mapPin: <><path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round"/>,
    tv: <><rect x="2" y="7" width="20" height="15" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="17 2 12 7 7 2" strokeLinecap="round" strokeLinejoin="round"/></>,
    cpu: <><rect x="4" y="4" width="16" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="9" width="6" height="6" strokeLinecap="round" strokeLinejoin="round"/><line x1="9" y1="1" x2="9" y2="4" strokeLinecap="round" strokeLinejoin="round"/><line x1="15" y1="1" x2="15" y2="4" strokeLinecap="round" strokeLinejoin="round"/><line x1="9" y1="20" x2="9" y2="23" strokeLinecap="round" strokeLinejoin="round"/><line x1="15" y1="20" x2="15" y2="23" strokeLinecap="round" strokeLinejoin="round"/><line x1="20" y1="9" x2="23" y2="9" strokeLinecap="round" strokeLinejoin="round"/><line x1="20" y1="14" x2="23" y2="14" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="9" x2="4" y2="9" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="14" x2="4" y2="14" strokeLinecap="round" strokeLinejoin="round"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" strokeLinejoin="round"/><line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round"/></>,
    trash: <><polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round"/><path strokeLinecap="round" strokeLinejoin="round" d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>,
    camera: <><path strokeLinecap="round" strokeLinejoin="round" d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4" strokeLinecap="round" strokeLinejoin="round"/></>,
    chevronRight: <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round"/>,
    chevronDown: <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round"/>,
    settings: <><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>,
    grid: <><rect x="3" y="3" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/><rect x="14" y="3" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/><rect x="14" y="14" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="14" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/></>,
    arrowLeft: <><line x1="19" y1="12" x2="5" y2="12" strokeLinecap="round" strokeLinejoin="round"/><polyline points="12 19 5 12 12 5" strokeLinecap="round" strokeLinejoin="round"/></>,
    info: <><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="8" x2="12.01" y2="8" strokeLinecap="round" strokeLinejoin="round"/></>,
    scan: <><path strokeLinecap="round" strokeLinejoin="round" d="M3 9V5a2 2 0 012-2h4M3 15v4a2 2 0 002 2h4M21 9V5a2 2 0 00-2-2h-4M21 15v4a2 2 0 01-2 2h-4"/><line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" strokeLinejoin="round"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      {icons[name]}
    </svg>
  );
};

// ─── LOGO COMPONENT ──────────────────────────────────────────────────────────
const ZekvoltLogo = ({ size = 60 }) => (
  <div style={{
    width: size, height: size,
    background: "#000",
    borderRadius: size * 0.22,
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: `0 0 ${size * 0.4}px ${T.cyan}44, 0 0 ${size * 0.8}px ${T.cyan}11`,
    position: "relative", overflow: "hidden",
    flexShrink: 0,
  }}>
    <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 60 60" fill="none">
      {/* Z shape in cyan */}
      <path d="M8 10 L40 10 L40 18 L16 18 L40 42 L40 50 L8 50 L8 42 L32 42 L8 18 Z" fill={T.cyan} opacity="0.9"/>
      {/* Arrow on Z */}
      <path d="M32 42 L40 50 L48 42" stroke={T.cyan} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Lightning bolt in gold */}
      <path d="M28 8 L18 30 L26 30 L22 52 L36 26 L28 26 Z" fill={T.gold}/>
    </svg>
  </div>
);

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
const Input = ({ label, icon, type = "text", value, onChange, placeholder, rightEl }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ color: T.textMuted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontFamily: "monospace" }}>{label}</div>}
    <div style={{
      background: T.card, border: `1px solid ${T.border}`,
      borderRadius: 12, display: "flex", alignItems: "center",
      padding: "0 14px", gap: 10,
      transition: "border-color .2s",
    }}>
      {icon && <Icon name={icon} size={17} color={T.textMuted} />}
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1, background: "none", border: "none", outline: "none",
          color: T.text, fontSize: 15, padding: "14px 0",
          fontFamily: "'DM Sans', sans-serif",
        }}
      />
      {rightEl}
    </div>
  </div>
);

const Select = ({ label, icon, value, onChange, options }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ color: T.textMuted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontFamily: "monospace" }}>{label}</div>}
    <div style={{
      background: T.card, border: `1px solid ${T.border}`,
      borderRadius: 12, display: "flex", alignItems: "center",
      padding: "0 14px", gap: 10,
    }}>
      {icon && <Icon name={icon} size={17} color={T.textMuted} />}
      <select
        value={value} onChange={e => onChange(e.target.value)}
        style={{
          flex: 1, background: "none", border: "none", outline: "none",
          color: value ? T.text : T.textMuted, fontSize: 15, padding: "14px 0",
          fontFamily: "'DM Sans', sans-serif", cursor: "pointer", appearance: "none",
        }}
      >
        {options.map(o => <option key={o.value} value={o.value} style={{ background: T.card }}>{o.label}</option>)}
      </select>
      <Icon name="chevronDown" size={16} color={T.textMuted} />
    </div>
  </div>
);

const Btn = ({ children, onClick, variant = "primary", disabled, style: s }) => {
  const styles = {
    primary: { background: `linear-gradient(135deg, ${T.cyan}, #00a8a0)`, color: T.bg, fontWeight: 700 },
    ghost: { background: T.cyanDim, border: `1px solid ${T.cyanMid}`, color: T.cyan, fontWeight: 600 },
    danger: { background: "#ff475722", border: `1px solid #ff475766`, color: T.red, fontWeight: 600 },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", padding: "15px 20px", borderRadius: 14, border: "none",
      fontSize: 15, cursor: disabled ? "not-allowed" : "pointer",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      opacity: disabled ? 0.5 : 1, transition: "all .2s", letterSpacing: .5,
      fontFamily: "'DM Sans', sans-serif",
      ...styles[variant], ...s,
    }}>{children}</button>
  );
};

// ─── APPLIANCES DATA ─────────────────────────────────────────────────────────
const APPLIANCES_DB = {
  "Nevera/Refrigerador": { watts: 150, icon: "🧊", defaultHours: 24 },
  "Televisor LED 32\"": { watts: 45, icon: "📺", defaultHours: 6 },
  "Televisor LED 55\"": { watts: 120, icon: "📺", defaultHours: 6 },
  "Lavadora": { watts: 500, icon: "🫧", defaultHours: 1.5 },
  "Microondas": { watts: 1200, icon: "📡", defaultHours: 0.5 },
  "Aire Acondicionado 9000 BTU": { watts: 900, icon: "❄️", defaultHours: 8 },
  "Aire Acondicionado 12000 BTU": { watts: 1200, icon: "❄️", defaultHours: 8 },
  "Ducha eléctrica": { watts: 3500, icon: "🚿", defaultHours: 0.5 },
  "Estufa eléctrica (1 fogón)": { watts: 1500, icon: "🍳", defaultHours: 1 },
  "Plancha de ropa": { watts: 1000, icon: "👕", defaultHours: 0.5 },
  "Computador portátil": { watts: 65, icon: "💻", defaultHours: 8 },
  "Computador escritorio": { watts: 250, icon: "🖥️", defaultHours: 8 },
  "Horno eléctrico": { watts: 2000, icon: "🔥", defaultHours: 1 },
  "Licuadora": { watts: 400, icon: "🥤", defaultHours: 0.2 },
  "Bombilla LED": { watts: 10, icon: "💡", defaultHours: 8 },
  "Ventilador": { watts: 60, icon: "🌀", defaultHours: 8 },
  "Calentador de agua": { watts: 1500, icon: "♨️", defaultHours: 1 },
  "Secadora de ropa": { watts: 3000, icon: "💨", defaultHours: 1 },
};

const COMPANIES = {
  "Valle del Cauca": ["EPSA (Celsia)", "Emcali"],
  "Cundinamarca / Bogotá": ["Enel Codensa"],
  "Antioquia": ["EPM"],
  "Atlántico": ["Air-e"],
  "Bolívar": ["Afinia"],
  "Nariño": ["Cedenar"],
  "Otras": ["Energía del Pacífico", "Electricaribe", "Otra compañía"],
};

const CITIES = Object.keys(COMPANIES);

// Tarifa kWh por estrato y empresa (pesos colombianos COP aproximados 2024)
const TARIFFS = {
  "EPSA (Celsia)": [420, 480, 560, 650, 720, 800],
  "Emcali":        [400, 460, 540, 630, 700, 780],
  "Enel Codensa":  [450, 510, 590, 680, 750, 830],
  "EPM":           [410, 470, 550, 640, 710, 790],
  "Air-e":         [380, 440, 520, 610, 680, 760],
  "Afinia":        [390, 450, 530, 620, 690, 770],
  "Cedenar":       [400, 460, 540, 630, 700, 780],
};
const DEFAULT_TARIFF = [410, 470, 550, 640, 710, 790];

// ─── SCREENS ─────────────────────────────────────────────────────────────────

// SPLASH
const SplashScreen = ({ onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: `radial-gradient(ellipse at 50% 40%, #0d1f1e 0%, ${T.bg} 70%)`,
    }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 30px #00d4c833} 50%{box-shadow:0 0 60px #00d4c866,0 0 120px #00d4c822} }
        @keyframes scanLine { 0%{top:-4px} 100%{top:100%} }
        .logo-pulse { animation: pulse 2s ease-in-out infinite, glow 2s ease-in-out infinite; }
        .fade-up-1 { animation: fadeUp .7s .8s both ease-out; }
        .fade-up-2 { animation: fadeUp .7s 1.2s both ease-out; }
        .fade-up-3 { animation: fadeUp .7s 1.6s both ease-out; }
      `}</style>
      <div className="logo-pulse" style={{ marginBottom: 28 }}>
        <ZekvoltLogo size={100} />
      </div>
      <div className="fade-up-1" style={{ fontSize: 38, fontWeight: 800, color: T.cyan, letterSpacing: -1, fontFamily: "'DM Sans', sans-serif" }}>
        Zekvolt
      </div>
      <div className="fade-up-2" style={{ fontSize: 11, color: T.textMuted, letterSpacing: 4, textTransform: "uppercase", marginTop: 4 }}>
        Regulación Eléctrica Residencial
      </div>
      <div className="fade-up-3" style={{ marginTop: 60, display: "flex", gap: 6 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: 3,
            background: i === 0 ? T.cyan : T.border,
            transition: "all .3s",
          }}/>
        ))}
      </div>
    </div>
  );
};

// LOGIN
const LoginScreen = ({ onLogin, onGoRegister }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  return (
    <div style={{ height: "100%", overflowY: "auto", background: T.bg }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .screen-fade { animation: fadeIn .5s ease-out both; }
      `}</style>
      {/* Header gradient */}
      <div style={{
        height: 220, background: `radial-gradient(ellipse at 50% 100%, #0d2a28 0%, ${T.bg} 70%)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 12, paddingTop: 20,
      }}>
        <ZekvoltLogo size={72} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: T.cyan, fontFamily: "'DM Sans', sans-serif" }}>Zekvolt</div>
          <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: 3, textTransform: "uppercase" }}>Regulación Eléctrica Residencial</div>
        </div>
      </div>

      <div className="screen-fade" style={{ padding: "24px 24px 40px" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.text, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Bienvenido</div>
        <div style={{ fontSize: 14, color: T.textMuted, marginBottom: 28 }}>Inicia sesión para gestionar tu consumo eléctrico</div>

        <Input label="Correo electrónico" icon="mail" value={email} onChange={setEmail} placeholder="tu@email.com" />
        <Input label="Contraseña" icon="lock" type={showPass ? "text" : "password"} value={pass} onChange={setPass} placeholder="••••••••"
          rightEl={
            <button onClick={() => setShowPass(!showPass)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <Icon name={showPass ? "eyeOff" : "eye"} size={16} color={T.textMuted} />
            </button>
          }
        />

        <div style={{ textAlign: "right", marginBottom: 24 }}>
          <span style={{ color: T.cyan, fontSize: 13, cursor: "pointer" }}>¿Olvidaste tu contraseña?</span>
        </div>

        <Btn onClick={handleLogin} disabled={loading}>
          {loading ? <><div style={{ width: 18, height: 18, border: `2px solid ${T.bg}44`, borderTop: `2px solid ${T.bg}`, borderRadius: "50%", animation: "spin .7s linear infinite" }}/>Ingresando...</> : <><Icon name="bolt" size={18} color={T.bg}/>Iniciar Sesión</>}
        </Btn>

        <div style={{ textAlign: "center", marginTop: 24, color: T.textMuted, fontSize: 14 }}>
          ¿No tienes cuenta?{" "}
          <span onClick={onGoRegister} style={{ color: T.cyan, fontWeight: 600, cursor: "pointer" }}>Regístrate</span>
        </div>

        {/* Demo hint */}
        <div style={{ marginTop: 20, background: T.cyanDim, border: `1px solid ${T.cyanMid}`, borderRadius: 10, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center" }}>
          <Icon name="info" size={15} color={T.cyan} />
          <span style={{ color: T.cyan, fontSize: 12 }}>Demo: presiona iniciar sesión con cualquier dato</span>
        </div>
      </div>
      <style>{`@keyframes spin { to{transform:rotate(360deg)} }`}</style>
    </div>
  );
};

// REGISTER
const RegisterScreen = ({ onBack, onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = () => { setLoading(true); setTimeout(() => { setLoading(false); onRegister(); }, 1200); };

  return (
    <div style={{ height: "100%", overflowY: "auto", background: T.bg }}>
      <div style={{ padding: "50px 24px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 8, cursor: "pointer" }}>
          <Icon name="arrowLeft" size={18} color={T.text} />
        </button>
        <div style={{ fontSize: 20, fontWeight: 700, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>Crear cuenta</div>
      </div>
      <div style={{ padding: "0 24px 40px" }}>
        <div style={{ fontSize: 14, color: T.textMuted, marginBottom: 28 }}>Únete a Zekvolt y controla tu factura eléctrica</div>
        <Input label="Nombre completo" icon="user" value={name} onChange={setName} placeholder="Juan García" />
        <Input label="Correo electrónico" icon="mail" value={email} onChange={setEmail} placeholder="tu@email.com" />
        <Input label="Contraseña" icon="lock" type="password" value={pass} onChange={setPass} placeholder="Mín. 8 caracteres" />
        <div style={{ marginTop: 8, marginBottom: 24 }}>
          <Btn onClick={handle} disabled={loading}>
            {loading ? "Creando cuenta..." : <><Icon name="bolt" size={18} color={T.bg}/>Crear cuenta</>}
          </Btn>
        </div>
        <div style={{ fontSize: 12, color: T.textMuted, textAlign: "center", lineHeight: 1.6 }}>
          Al registrarte aceptas los <span style={{ color: T.cyan }}>Términos de uso</span> y la <span style={{ color: T.cyan }}>Política de privacidad</span> de Zekvolt.
        </div>
      </div>
    </div>
  );
};

// SETUP (onboarding)
const SetupScreen = ({ onDone }) => {
  const [step, setStep] = useState(0);
  const [city, setCity] = useState("");
  const [estrato, setEstrato] = useState("");
  const [company, setCompany] = useState("");

  const companies = city ? COMPANIES[city] || [] : [];
  const canNext0 = city && estrato && company;

  const next = () => { if (step === 0 && canNext0) { onDone({ city, estrato: parseInt(estrato), company }); } };

  return (
    <div style={{ height: "100%", overflowY: "auto", background: T.bg }}>
      <div style={{ padding: "50px 24px 24px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 32 }}>
          {[0].map(i => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? T.cyan : T.border }}/>
          ))}
        </div>
        <div style={{ fontSize: 11, color: T.cyan, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8, fontFamily: "monospace" }}>Configuración inicial</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: T.text, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>¿Dónde vives?</div>
        <div style={{ fontSize: 14, color: T.textMuted, marginBottom: 28, lineHeight: 1.6 }}>Esta información nos ayuda a calcular las tarifas exactas de tu empresa energética.</div>

        <Select label="Departamento / Ciudad" icon="mapPin" value={city} onChange={v => { setCity(v); setCompany(""); }}
          options={[{ value: "", label: "Selecciona tu ciudad..." }, ...CITIES.map(c => ({ value: c, label: c }))]}
        />
        <Select label="Estrato socioeconómico" icon="home" value={estrato} onChange={setEstrato}
          options={[{ value: "", label: "Selecciona tu estrato..." }, ...["1","2","3","4","5","6"].map(e => ({ value: e, label: `Estrato ${e}` }))]}
        />
        {city && (
          <Select label="Empresa energética" icon="zap" value={company} onChange={setCompany}
            options={[{ value: "", label: "Selecciona tu empresa..." }, ...companies.map(c => ({ value: c, label: c }))]}
          />
        )}

        {canNext0 && (
          <div style={{ marginTop: 8 }}>
            <div style={{ background: T.cyanDim, border: `1px solid ${T.cyanMid}`, borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
              <div style={{ color: T.cyan, fontSize: 13, fontWeight: 600 }}>Tu tarifa aproximada</div>
              <div style={{ color: T.text, fontSize: 22, fontWeight: 800, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>
                ${((TARIFFS[company] || DEFAULT_TARIFF)[parseInt(estrato) - 1]).toLocaleString("es-CO")}
                <span style={{ fontSize: 13, fontWeight: 400, color: T.textMuted }}> / kWh</span>
              </div>
            </div>
            <Btn onClick={next}><Icon name="bolt" size={18} color={T.bg}/>Continuar</Btn>
          </div>
        )}
      </div>
    </div>
  );
};

// MAIN APP
const MainApp = ({ profile, onLogout }) => {
  const [tab, setTab] = useState("home");
  const [appliances, setAppliances] = useState([
    { id: 1, name: "Nevera/Refrigerador", hours: 24, qty: 1 },
    { id: 2, name: "Televisor LED 32\"", hours: 6, qty: 1 },
    { id: 3, name: "Bombilla LED", hours: 8, qty: 8 },
  ]);
  const [showAddAppliance, setShowAddAppliance] = useState(false);
  const [newAppliance, setNewAppliance] = useState("");
  const [newHours, setNewHours] = useState("");
  const [newQty, setNewQty] = useState("1");

  const tariff = (TARIFFS[profile.company] || DEFAULT_TARIFF)[profile.estrato - 1];

  // Calculations
  const totalWattHoursMonth = appliances.reduce((acc, a) => {
    const db = APPLIANCES_DB[a.name];
    if (!db) return acc;
    return acc + db.watts * a.hours * 30 * a.qty;
  }, 0);
  const totalKwh = totalWattHoursMonth / 1000;
  const estimatedBill = totalKwh * tariff;
  const dailyKwh = totalKwh / 30;

  const addAppliance = () => {
    if (!newAppliance) return;
    const db = APPLIANCES_DB[newAppliance];
    setAppliances(prev => [...prev, {
      id: Date.now(), name: newAppliance,
      hours: parseFloat(newHours) || db?.defaultHours || 4,
      qty: parseInt(newQty) || 1,
    }]);
    setNewAppliance(""); setNewHours(""); setNewQty("1");
    setShowAddAppliance(false);
  };

  const removeAppliance = (id) => setAppliances(prev => prev.filter(a => a.id !== id));

  const TABS = [
    { id: "home", icon: "activity", label: "Inicio" },
    { id: "appliances", icon: "grid", label: "Electrodomésticos" },
    { id: "camera", icon: "camera", label: "Escanear" },
    { id: "settings", icon: "settings", label: "Ajustes" },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .screen-in { animation: fadeIn .4s ease-out both; }
        @keyframes countUp { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }
        .count-up { animation: countUp .6s .2s both cubic-bezier(.34,1.56,.64,1); }
        ::-webkit-scrollbar { width: 3px; background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e262e; border-radius: 2px; }
        input::placeholder { color: #3d5a58; }
        select option { background: #161b20; color: #e8f4f3; }
      `}</style>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>

        {/* HOME */}
        {tab === "home" && (
          <div className="screen-in" style={{ padding: "50px 20px 100px" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 13, color: T.textMuted }}>Buenos días,</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Panel de consumo</div>
              </div>
              <ZekvoltLogo size={42} />
            </div>

            {/* Main card */}
            <div style={{
              background: `linear-gradient(135deg, #0d2a28 0%, #0a1f1e 100%)`,
              border: `1px solid ${T.cyanMid}`,
              borderRadius: 20, padding: 24, marginBottom: 16,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `${T.cyan}11`, filter: "blur(20px)" }}/>
              <div style={{ fontSize: 11, color: T.cyan, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4, fontFamily: "monospace" }}>Factura estimada del mes</div>
              <div className="count-up" style={{ fontSize: 44, fontWeight: 800, color: T.text, lineHeight: 1.1 }}>
                ${Math.round(estimatedBill).toLocaleString("es-CO")}
                <span style={{ fontSize: 16, fontWeight: 500, color: T.textMuted }}> COP</span>
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>Consumo mensual</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.cyan }}>{totalKwh.toFixed(1)} <span style={{ fontSize: 13, fontWeight: 400 }}>kWh</span></div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>Consumo diario</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.gold }}>{dailyKwh.toFixed(2)} <span style={{ fontSize: 13, fontWeight: 400 }}>kWh</span></div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>Tarifa kWh</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.text }}>${tariff.toLocaleString("es-CO")}</div>
                </div>
              </div>
            </div>

            {/* Info pills */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {[
                { label: profile.city, icon: "mapPin", color: T.textMuted },
                { label: `Estrato ${profile.estrato}`, icon: "home", color: T.gold },
                { label: profile.company, icon: "zap", color: T.cyan },
              ].map((pill, i) => (
                <div key={i} style={{
                  flex: 1, background: T.card, border: `1px solid ${T.border}`,
                  borderRadius: 10, padding: "8px 10px", textAlign: "center",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                }}>
                  <Icon name={pill.icon} size={14} color={pill.color} />
                  <div style={{ fontSize: 10, color: T.textMuted, lineHeight: 1.2 }}>{pill.label}</div>
                </div>
              ))}
            </div>

            {/* Top consumers */}
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>Top consumidores</div>
            {appliances
              .map(a => ({ ...a, monthly: (APPLIANCES_DB[a.name]?.watts || 0) * a.hours * 30 * a.qty / 1000 }))
              .sort((a, b) => b.monthly - a.monthly)
              .slice(0, 4)
              .map((a, i) => {
                const pct = totalKwh > 0 ? (a.monthly / totalKwh) * 100 : 0;
                return (
                  <div key={a.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "12px 16px", marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 20 }}>{APPLIANCES_DB[a.name]?.icon}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{a.name}</div>
                          <div style={{ fontSize: 11, color: T.textMuted }}>{a.hours}h/día × {a.qty} unid.</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: T.cyan }}>{a.monthly.toFixed(1)} kWh</div>
                        <div style={{ fontSize: 11, color: T.textMuted }}>{pct.toFixed(0)}%</div>
                      </div>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: T.border }}>
                      <div style={{ height: "100%", borderRadius: 2, width: `${pct}%`, background: i === 0 ? T.gold : T.cyan, transition: "width .8s ease" }}/>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* APPLIANCES */}
        {tab === "appliances" && (
          <div className="screen-in" style={{ padding: "50px 20px 100px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Electrodomésticos</div>
                <div style={{ fontSize: 13, color: T.textMuted }}>{appliances.length} registrados</div>
              </div>
              <button onClick={() => setShowAddAppliance(true)} style={{
                background: T.cyan, border: "none", borderRadius: 12, padding: "10px 16px",
                display: "flex", alignItems: "center", gap: 6, cursor: "pointer", color: T.bg, fontWeight: 700, fontSize: 13,
              }}>
                <Icon name="plus" size={16} color={T.bg} /> Agregar
              </button>
            </div>

            {/* Summary bar */}
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 20, display: "flex", justifyContent: "space-between" }}>
              <div><div style={{ fontSize: 11, color: T.textMuted }}>Total mensual</div><div style={{ fontSize: 20, fontWeight: 700, color: T.cyan }}>{totalKwh.toFixed(1)} kWh</div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: T.textMuted }}>Estimado factura</div><div style={{ fontSize: 20, fontWeight: 700, color: T.gold }}>${Math.round(estimatedBill).toLocaleString("es-CO")}</div></div>
            </div>

            {/* Add modal */}
            {showAddAppliance && (
              <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18, padding: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 16 }}>Agregar electrodoméstico</div>
                <Select label="Electrodoméstico" value={newAppliance} onChange={v => { setNewAppliance(v); setNewHours(APPLIANCES_DB[v]?.defaultHours?.toString() || ""); }}
                  options={[{ value: "", label: "Selecciona..." }, ...Object.keys(APPLIANCES_DB).map(k => ({ value: k, label: `${APPLIANCES_DB[k].icon} ${k} (${APPLIANCES_DB[k].watts}W)` }))]}
                />
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <Input label="Horas/día" value={newHours} onChange={setNewHours} placeholder="4" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Input label="Cantidad" value={newQty} onChange={setNewQty} placeholder="1" />
                  </div>
                </div>
                {newAppliance && newHours && (
                  <div style={{ background: T.cyanDim, border: `1px solid ${T.cyanMid}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: T.cyan }}>
                    Consumo estimado: <strong>{((APPLIANCES_DB[newAppliance]?.watts || 0) * parseFloat(newHours || 0) * 30 * parseInt(newQty || 1) / 1000).toFixed(1)} kWh/mes</strong>
                    {" "}≈ <strong>${Math.round((APPLIANCES_DB[newAppliance]?.watts || 0) * parseFloat(newHours || 0) * 30 * parseInt(newQty || 1) / 1000 * tariff).toLocaleString("es-CO")} COP</strong>
                  </div>
                )}
                <div style={{ display: "flex", gap: 10 }}>
                  <Btn variant="ghost" onClick={() => setShowAddAppliance(false)} style={{ flex: 1 }}>Cancelar</Btn>
                  <Btn onClick={addAppliance} style={{ flex: 1 }} disabled={!newAppliance}><Icon name="plus" size={16} color={T.bg}/>Agregar</Btn>
                </div>
              </div>
            )}

            {appliances.map(a => {
              const db = APPLIANCES_DB[a.name];
              const monthly = db ? db.watts * a.hours * 30 * a.qty / 1000 : 0;
              const cost = monthly * tariff;
              return (
                <div key={a.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: "14px 16px", marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
                      <div style={{ fontSize: 28 }}>{db?.icon || "⚡"}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{a.name}</div>
                        <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>
                          {db?.watts || 0}W · {a.hours}h/día · {a.qty} unid.
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: T.cyan }}>{monthly.toFixed(1)} kWh/mes</span>
                          <span style={{ fontSize: 13, color: T.textMuted }}>≈ ${Math.round(cost).toLocaleString("es-CO")}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeAppliance(a.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                      <Icon name="trash" size={16} color={T.red} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CAMERA / AI SCAN */}
        {tab === "camera" && (
          <div className="screen-in" style={{ padding: "50px 20px 100px" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.text, marginBottom: 6 }}>Escanear Electrodoméstico</div>
            <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 24, lineHeight: 1.6 }}>Próximamente: apunta la cámara a cualquier electrodoméstico y la IA reconocerá automáticamente el modelo y su consumo.</div>

            {/* Camera viewfinder mockup */}
            <div style={{
              background: "#000", borderRadius: 20, overflow: "hidden",
              border: `2px solid ${T.border}`, marginBottom: 20, position: "relative",
              aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* Corner brackets */}
              {[["top:16px;left:16px;border-top:3px;border-left:3px", "topleft"],
                ["top:16px;right:16px;border-top:3px;border-right:3px", "topright"],
                ["bottom:16px;left:16px;border-bottom:3px;border-left:3px", "btleft"],
                ["bottom:16px;right:16px;border-bottom:3px;border-right:3px", "btright"],
              ].map(([s, k]) => (
                <div key={k} style={{
                  position: "absolute", width: 28, height: 28,
                  top: k.includes("top") ? 16 : undefined,
                  bottom: k.includes("bt") ? 16 : undefined,
                  left: k.includes("left") ? 16 : undefined,
                  right: k.includes("right") ? 16 : undefined,
                  borderTop: k.includes("top") ? `3px solid ${T.cyan}` : undefined,
                  borderBottom: k.includes("bt") ? `3px solid ${T.cyan}` : undefined,
                  borderLeft: k.includes("left") ? `3px solid ${T.cyan}` : undefined,
                  borderRight: k.includes("right") ? `3px solid ${T.cyan}` : undefined,
                  borderRadius: 2,
                }}/>
              ))}
              <div style={{ textAlign: "center" }}>
                <Icon name="camera" size={48} color={T.textSub} />
                <div style={{ color: T.textSub, fontSize: 14, marginTop: 10 }}>Cámara no disponible en demo</div>
              </div>
              {/* Scan line animation */}
              <style>{`@keyframes scanAnim { 0%{top:10%} 100%{top:90%} }`}</style>
              <div style={{
                position: "absolute", left: 20, right: 20, height: 2,
                background: `linear-gradient(90deg, transparent, ${T.cyan}, transparent)`,
                animation: "scanAnim 2.5s ease-in-out infinite alternate",
                opacity: 0.5,
              }}/>
            </div>

            {/* Feature cards */}
            {[
              { icon: "scan", title: "Reconocimiento IA", desc: "Identifica automáticamente el electrodoméstico con visión artificial avanzada." },
              { icon: "cpu", title: "Datos técnicos", desc: "Obtén potencia en watts, modelo exacto y datos de eficiencia energética." },
              { icon: "bolt", title: "Cálculo instantáneo", desc: "Agrega el electrodoméstico a tu lista con un toque y ve el impacto en tu factura." },
            ].map((f, i) => (
              <div key={i} style={{
                background: T.card, border: `1px solid ${T.border}`, borderRadius: 14,
                padding: "14px 16px", marginBottom: 10, display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <div style={{ background: T.cyanDim, border: `1px solid ${T.cyanMid}`, borderRadius: 10, padding: 8, flexShrink: 0 }}>
                  <Icon name={f.icon} size={20} color={T.cyan} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 4 }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 8 }}>
              <Btn variant="ghost" style={{ opacity: .6 }}>
                <Icon name="camera" size={18} color={T.cyan}/>
                Próximamente — Activar cámara IA
              </Btn>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab === "settings" && (
          <div className="screen-in" style={{ padding: "50px 20px 100px" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.text, marginBottom: 24 }}>Ajustes</div>

            {/* Profile card */}
            <div style={{ background: `linear-gradient(135deg, #0d2a28, #0a1a19)`, border: `1px solid ${T.cyanMid}`, borderRadius: 18, padding: "18px 20px", marginBottom: 24, display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 26, background: T.cyanMid, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="user" size={24} color={T.cyan} />
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: T.text }}>Mi cuenta</div>
                <div style={{ fontSize: 13, color: T.textMuted }}>usuario@zekvolt.co</div>
              </div>
            </div>

            {/* Settings list */}
            {[
              { section: "Mi hogar", items: [
                { icon: "mapPin", label: "Ciudad", value: profile.city },
                { icon: "home", label: "Estrato", value: `Estrato ${profile.estrato}` },
                { icon: "zap", label: "Empresa energética", value: profile.company },
                { icon: "activity", label: "Tarifa por kWh", value: `$${tariff.toLocaleString("es-CO")} COP` },
              ]},
              { section: "App", items: [
                { icon: "bolt", label: "Modo oscuro", value: "Activado" },
                { icon: "info", label: "Versión", value: "1.0.0 beta" },
              ]},
            ].map((group, gi) => (
              <div key={gi} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: T.textMuted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, fontFamily: "monospace" }}>{group.section}</div>
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden" }}>
                  {group.items.map((item, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "14px 16px",
                      borderBottom: i < group.items.length - 1 ? `1px solid ${T.border}` : "none",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Icon name={item.icon} size={17} color={T.textMuted} />
                        <span style={{ fontSize: 14, color: T.text }}>{item.label}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 13, color: T.textMuted }}>{item.value}</span>
                        <Icon name="chevronRight" size={15} color={T.textSub} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Btn variant="danger" onClick={onLogout}>Cerrar sesión</Btn>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{
        background: T.surface, borderTop: `1px solid ${T.border}`,
        display: "flex", paddingBottom: 8, paddingTop: 4,
        position: "sticky", bottom: 0,
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, background: "none", border: "none", cursor: "pointer",
            padding: "8px 4px", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 4, transition: "all .2s",
          }}>
            <div style={{
              padding: "6px 16px", borderRadius: 20,
              background: tab === t.id ? T.cyanDim : "transparent",
              transition: "all .2s",
            }}>
              <Icon name={t.icon} size={20} color={tab === t.id ? T.cyan : T.textMuted} />
            </div>
            <span style={{ fontSize: 10, color: tab === t.id ? T.cyan : T.textMuted, fontWeight: tab === t.id ? 600 : 400 }}>
              {t.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function ZekvoltApp() {
  const [screen, setScreen] = useState("splash");
  const [profile, setProfile] = useState(null);

  const handleSetup = (data) => {
    setProfile(data);
    setScreen("app");
  };

  return (
    <div style={{
      width: "100%", maxWidth: 420, margin: "0 auto",
      height: "100vh", background: T.bg,
      fontFamily: "'DM Sans', sans-serif",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      {screen === "splash" && <SplashScreen onDone={() => setScreen("login")} />}
      {screen === "login" && <LoginScreen onLogin={() => setScreen("setup")} onGoRegister={() => setScreen("register")} />}
      {screen === "register" && <RegisterScreen onBack={() => setScreen("login")} onRegister={() => setScreen("setup")} />}
      {screen === "setup" && <SetupScreen onDone={handleSetup} />}
      {screen === "app" && profile && <MainApp profile={profile} onLogout={() => { setProfile(null); setScreen("login"); }} />}
    </div>
  );
}
