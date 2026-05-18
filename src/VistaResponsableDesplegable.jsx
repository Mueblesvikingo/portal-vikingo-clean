import React, { useMemo, useState } from "react";

const ADMIN_PASSWORD = "vikingo2025";

const realResponsibleList = [
  "Coordinador Estratégico/SIG - Cristian",
  "Director general - Alejandro",
  "Gerente Operaciones - Hugo",
  "Coordinador de Calidad - Beatriz",
  "Finanzas - Samantha",
  "Recursos humanos - Aurora",
  "Ingeniero de producto - Beatriz",
  "Project Manager - Jacqueline",
  "Coordinador SST - Aurora",
  "Analista de talento - Jacqueline",
  "Analista de procesos - Elizabeth",
];

const objectiveNames = {
  "OBJ-01": "Estabilidad operativa y cumplimiento de la demanda planificada",
  "OBJ-02": "Crecimiento comercial con capacidad operativa disponible",
  "OBJ-03": "Estabilidad financiera y liquidez operativa",
  "OBJ-04": "Disciplina presupuestal",
  "OBJ-05": "Rentabilidad de clientes y pedidos",
  "OBJ-06": "Confiabilidad de entrega",
  "OBJ-07": "Satisfacción del cliente",
  "OBJ-08": "Control de excepciones comerciales",
  "OBJ-09": "Alineación demanda-capacidad",
  "OBJ-010": "Capacidad productiva escalable",
  "OBJ-011": "Gestión estandarizada de procesos",
  "OBJ-012": "Desarrollo de competencias",
  "OBJ-013": "Compromiso organizacional",
  "OBJ-014": "Operación digital integrada",
};

const responsibleProfile = {
  "Coordinador Estratégico/SIG": { person: "Cristian", area: "Planeación estratégica del SIG / Evaluación desempeño del SIG" },
  "Director general": { person: "Alejandro", area: "Dirección / Ventas / Enfoque al cliente" },
  "Gerente Operaciones": { person: "Hugo", area: "Compras / Producción / Inventarios / Almacenes / Distribución" },
  "Coordinador de Calidad": { person: "Beatriz", area: "Gestión de calidad / liberación / no conformidades" },
  Finanzas: { person: "Samantha", area: "Planeación financiera / disciplina presupuestal" },
  "Recursos humanos": { person: "Aurora", area: "Recursos humanos / gestión de personal" },
  "Ingeniero de producto": { person: "Beatriz", area: "Ingeniería / desarrollo de productos" },
  "Project Manager": { person: "Jacqueline", area: "Seguimiento de acciones y compromisos" },
  "Coordinador SST": { person: "Aurora", area: "Seguridad y salud laboral" },
  "Analista de talento": { person: "Jacqueline", area: "Gestión de competencias y desarrollo" },
  "Analista de procesos": { person: "Elizabeth", area: "Transformación digital y automatización" },
};

const sigDescriptions = {
  "4.1": { focus: "Comprender el contexto interno y externo que puede afectar el desempeño del SIG.", expects: "Identificar factores estratégicos, operativos, legales, comerciales, tecnológicos y culturales que influyen en los resultados.", evidence: "FODA, PESTEL, análisis de contexto, revisión estratégica y actualización documentada." },
  "4.2": { focus: "Identificar partes interesadas y requisitos pertinentes para el SIG.", expects: "Definir quién impacta o es impactado por el sistema, qué espera y qué requisitos deben atenderse.", evidence: "Matriz de partes interesadas, requisitos legales, comerciales, clientes, proveedores, personal y autoridades." },
  "4.3": { focus: "Definir los límites y alcance formal del SIG.", expects: "Indicar procesos, productos, servicios, sitios y criterios considerados dentro del sistema.", evidence: "Declaración de alcance, mapa de procesos y justificación de exclusiones cuando apliquen." },
  "4.4": { focus: "Establecer, mantener y mejorar los procesos necesarios para operar el SIG.", expects: "Cada proceso debe tener entradas, salidas, responsables, criterios, controles, indicadores, riesgos y evidencia objetiva.", evidence: "Mapa de procesos, caracterizaciones, procedimientos, matrices de cumplimiento y seguimiento del desempeño." },
  "5.1": { focus: "Demostrar liderazgo, compromiso y rendición de cuentas de la alta dirección.", expects: "Integrar el SIG a la estrategia, promover enfoque a procesos, asignar recursos y revisar resultados.", evidence: "Revisión por dirección, objetivos, recursos, comunicación, decisiones y seguimiento de compromisos." },
  "5.1.2": { focus: "Asegurar que los requisitos del cliente se determinan, cumplen y orientan a su satisfacción.", expects: "Controlar requisitos, riesgos de incumplimiento, cambios y percepción del cliente.", evidence: "Pedidos, especificaciones, quejas, encuestas, indicadores de entrega, reclamaciones y acciones correctivas." },
  "5.2": { focus: "Definir, comunicar y mantener una política alineada con el propósito y dirección estratégica.", expects: "La política debe ser apropiada, disponible, comunicada, entendida y servir como marco para objetivos.", evidence: "Política controlada, difusión, acuses, inducción, comunicación visual y revisión periódica." },
  "5.3": { focus: "Asignar roles, responsabilidades y autoridades dentro del SIG.", expects: "Las personas deben saber qué les corresponde, qué autoridad tienen y qué evidencia deben generar.", evidence: "Organigrama, perfiles, matriz RACI, caracterizaciones y responsabilidades por proceso." },
  "6.1": { focus: "Gestionar riesgos y oportunidades que puedan afectar los resultados del SIG.", expects: "Identificar, evaluar, tratar y revisar riesgos y oportunidades.", evidence: "Matriz de riesgos, planes de acción, controles, responsables, fechas y seguimiento de eficacia." },
  "6.2": { focus: "Establecer objetivos medibles y planificar acciones para lograrlos.", expects: "Los objetivos deben tener responsables, indicadores, metas, recursos, plazos y seguimiento documentado.", evidence: "Mapa estratégico, tablero de control, KPIs, metas, planes de acción y revisión de avances." },
  "6.3": { focus: "Controlar cambios que puedan afectar al SIG y sus procesos.", expects: "Planificar cambios considerando propósito, riesgos, recursos, responsabilidades e impacto operativo.", evidence: "Registro de cambios, análisis de impacto, autorizaciones, comunicación y verificación posterior." },
  "7.1": { focus: "Determinar y proporcionar los recursos necesarios para operar y mejorar el SIG.", expects: "Asegurar personal, infraestructura, ambiente, tecnología y recursos de medición adecuados.", evidence: "Presupuesto, plan de recursos, mantenimiento, infraestructura, herramientas y asignación de personal." },
  "7.2": { focus: "Asegurar competencia del personal que afecta el desempeño del SIG.", expects: "Definir competencias, evaluar brechas, capacitar y conservar evidencia de competencia.", evidence: "Matriz de competencias, perfiles, evaluaciones, capacitación, constancias y evaluación de eficacia." },
  "7.3": { focus: "Lograr conciencia del personal sobre política, objetivos, contribución y consecuencias del incumplimiento.", expects: "El personal debe entender cómo su trabajo impacta el SIG y qué responsabilidades tiene.", evidence: "Inducción, campañas, entrevistas, evaluaciones, comunicados, tableros y evidencias de sensibilización." },
  "7.5": { focus: "Controlar la información documentada necesaria para el SIG.", expects: "Documentos y registros identificados, aprobados, actualizados, disponibles y protegidos.", evidence: "Lista maestra, control documental, versiones, permisos, registros, formatos y trazabilidad de cambios." },
  "8.1": { focus: "Planificar y controlar la operación para cumplir requisitos.", expects: "Procesos operativos ejecutados bajo criterios definidos, controles, recursos y evidencia de cumplimiento.", evidence: "Planes operativos, instrucciones, órdenes, registros de producción, controles y seguimiento diario." },
  "8.2": { focus: "Gestionar requisitos del cliente antes, durante y después de aceptar pedidos.", expects: "Controlar comunicación, revisión de requisitos, cambios, factibilidad y cumplimiento de lo prometido.", evidence: "Cotizaciones, pedidos, especificaciones, confirmaciones, cambios autorizados y comunicación con clientes." },
  "8.3": { focus: "Controlar diseño y desarrollo de productos o servicios.", expects: "Planificar diseño, revisar entradas/salidas, validar resultados y controlar cambios.", evidence: "Planos, fichas técnicas, prototipos, validaciones, revisiones de diseño y registros de cambios." },
  "8.4": { focus: "Controlar proveedores externos, productos y servicios suministrados.", expects: "Evaluar, seleccionar, monitorear proveedores y comunicar requisitos claros.", evidence: "Evaluación de proveedores, órdenes de compra, criterios de aceptación, seguimiento y reevaluaciones." },
  "8.5": { focus: "Controlar producción o prestación del servicio bajo condiciones planificadas.", expects: "Operar con instrucciones, recursos, personal competente, controles e identificación trazable.", evidence: "Programas, instrucciones, registros de producción, inspecciones, trazabilidad y liberaciones parciales." },
  "8.6": { focus: "Verificar y liberar productos o servicios antes de entrega.", expects: "Liberar con criterios definidos, evidencia de conformidad y autorización responsable.", evidence: "Registros de inspección, checklists, autorizaciones, liberaciones y control de salidas no conformes." },
  "9.1": { focus: "Dar seguimiento, medir, analizar y evaluar el desempeño del SIG.", expects: "Definir qué se mide, cómo, cuándo, quién analiza y cómo se usan los resultados.", evidence: "KPIs, tableros, reportes, análisis de datos, reuniones de seguimiento y acciones derivadas." },
  "9.1.2": { focus: "Monitorear percepción del cliente sobre cumplimiento de necesidades y expectativas.", expects: "Existir método para obtener, analizar y usar información de satisfacción del cliente.", evidence: "Encuestas, quejas, reclamaciones, devoluciones, entrevistas, indicadores de satisfacción y acciones." },
  "9.2": { focus: "Realizar auditorías internas para verificar conformidad y eficacia del SIG.", expects: "Contar con programa, criterios, alcance, auditores competentes, informes y seguimiento de hallazgos.", evidence: "Programa, plan, listas de verificación, informes, no conformidades y acciones correctivas." },
  "9.3": { focus: "Revisar el SIG por dirección para asegurar conveniencia, adecuación y eficacia.", expects: "Evaluar desempeño, cambios, riesgos, recursos, oportunidades y decisiones de mejora.", evidence: "Acta de revisión, entradas, salidas, acuerdos, decisiones, responsables y seguimiento." },
  "10.1": { focus: "Determinar oportunidades de mejora y ejecutar acciones para mejorar resultados.", expects: "Basar la mejora en datos, desempeño, riesgos, auditorías, clientes y revisión por dirección.", evidence: "Planes de mejora, proyectos, indicadores, análisis de causa, seguimiento y verificación de eficacia." },
  "10.2": { focus: "Gestionar no conformidades y acciones correctivas para evitar recurrencia.", expects: "Reaccionar ante incumplimientos, analizar causa raíz, implementar acciones y evaluar eficacia.", evidence: "Registro de no conformidad, análisis causa raíz, plan de acción, responsables, fechas y cierre eficaz." },
};

const baseKpis = [
  ["OBJ-01", "Compras", "Número de compras urgentes", "≤5", "Gerente Operaciones", "Reduce costos ocultos y asegura estabilidad operacional mediante abastecimiento planificado."],
  ["OBJ-01", "Planeación y control producción", "% producción ejecutada sin desviaciones", "≥90%", "Gerente Operaciones", "Reduce desviaciones operativas y costos ocultos mediante estabilidad en la ejecución productiva."],
  ["OBJ-01", "Gestión inventarios", "% materiales disponibles conforme programación", "≥90%", "Gerente Operaciones", "Asegura disponibilidad confiable de materiales conforme a la programación operativa."],
  ["OBJ-01", "Distribución", "% entregas completas", "≥95%", "Gerente Operaciones", "Reduce costos logísticos y reprocesos mediante entregas completas conforme a lo programado."],
  ["OBJ-02", "Planeación y control producción", "% capacidad disponible para demanda comercial", "≥90%", "Gerente Operaciones", "Mantiene capacidad operativa disponible para responder al crecimiento comercial."],
  ["OBJ-02", "Gestión inventarios", "% PT disponible para entrega", "≥95%", "Gerente Operaciones", "Asegura disponibilidad operativa de producto terminado para entregas programadas."],
  ["OBJ-02", "Distribución", "% entregas sin devolución", "≥95%", "Gerente Operaciones", "Favorece confianza comercial mediante entregas correctas y sin devoluciones operativas."],
  ["OBJ-03", "Gestión inventarios", "N° PT sin salida programada", "≤50", "Gerente Operaciones", "Favorece liquidez mediante reducción de producto terminado sin salida programada."],
  ["OBJ-05", "Planeación y control producción", "% pedidos sin costos extraordinarios", "≥95%", "Gerente Operaciones", "Favorece estabilidad de rentabilidad mediante reducción de costos extraordinarios posteriores a la venta."],
  ["OBJ-06", "Planeación y control producción", "% producción conforme programación", "≥90%", "Gerente Operaciones", "Favorece estabilidad de entrega mediante ejecución productiva conforme a programación."],
  ["OBJ-06", "Gestión inventarios", "% exactitud inventario PT", "≥95%", "Gerente Operaciones", "Favorece confiabilidad de entrega mediante exactitud del inventario de producto terminado."],
  ["OBJ-06", "Control de almacenes", "% diferencias inventario almacén", "≤5%", "Gerente Operaciones", "Reduce diferencias detectadas en conteos cíclicos."],
  ["OBJ-06", "Distribución", "% rutas ejecutadas conforme programación", "≥95%", "Gerente Operaciones", "Favorece cumplimiento logístico mediante rutas conforme a programación."],
  ["OBJ-06", "Distribución", "% cumplimiento mantenimiento transporte", "≥95%", "Gerente Operaciones", "Asegura disponibilidad de unidades de transporte."],
  ["OBJ-07", "Distribución", "% entregas sin incidencias", "≥95%", "Gerente Operaciones", "Favorece experiencia positiva de entrega mediante reducción de incidencias."],
  ["OBJ-09", "Planeación y control producción", "% cumplimiento plan maestro producción", "≥90%", "Gerente Operaciones", "Alinea demanda y capacidad mediante cumplimiento del plan maestro."],
  ["OBJ-09", "Compras", "% cumplimiento plan de compra", "≥95%", "Gerente Operaciones", "Alinea compras con programación operativa."],
  ["OBJ-09", "Planeación y control producción", "% cumplimiento mantenimiento planificado", "≥95%", "Gerente Operaciones", "Asegura continuidad operativa mediante mantenimiento planificado."],
  ["OBJ-010", "Planeación y control producción", "% utilización capacidad instalada", "80%", "Gerente Operaciones", "Favorece capacidad productiva escalable mediante aprovechamiento de capacidad instalada."],
  ["OBJ-011", "Compras", "% cumplimiento plan evaluación proveedores", "≥90%", "Gerente Operaciones", "Estandariza la gestión de proveedores mediante evaluación periódica."],
  ["OBJ-01", "Ventas", "% cumplimiento plan comercial", "≥90%", "Director general", "Mejora alineación comercial y estabilidad operativa conforme a la demanda planificada."],
  ["OBJ-03", "Ventas", "% cartera vencida", "≤10%", "Director general", "Favorece estabilidad financiera mediante control de cartera vencida."],
  ["OBJ-05", "Ventas", "% ventas fuera margen objetivo", "≤10%", "Director general", "Controla ventas realizadas fuera del margen objetivo."],
  ["OBJ-06", "Ventas", "% pedidos capturados correctamente", "≥95%", "Director general", "Favorece confiabilidad de entrega desde la captura del pedido."],
  ["OBJ-07", "Ventas", "% pedidos sin incidencias comerciales", "≥95%", "Director general", "Favorece satisfacción del cliente durante la gestión del pedido."],
  ["OBJ-08", "Ventas", "% cotizaciones con excepción comercial", "≤10%", "Director general", "Controla excepciones comerciales durante cotización."],
  ["OBJ-09", "Ventas", "% pedidos urgentes", "≤5%", "Director general", "Reduce pedidos urgentes fuera de la planeación comercial."],
  ["OBJ-01", "Gestión calidad", "% productos sin retrabajo", "≥95%", "Coordinador de Calidad", "Reduce desviaciones y costos operativos por retrabajos."],
  ["OBJ-02", "Gestión calidad", "% pedidos liberados sin observaciones", "≥95%", "Coordinador de Calidad", "Fortalece satisfacción mediante liberación conforme."],
  ["OBJ-06", "Gestión calidad", "% pedidos liberados en tiempo", "≥95%", "Coordinador de Calidad", "Favorece cumplimiento de entrega mediante liberación oportuna."],
  ["OBJ-07", "Gestión calidad", "% clientes sin reclamaciones", "≥95%", "Coordinador de Calidad", "Reduce incidencias y reclamaciones posteriores a la entrega."],
  ["OBJ-03", "Planeación financiera", "Ciclo de caja", "≤Definir", "Finanzas", "Favorece estabilidad financiera mediante seguimiento del flujo operativo."],
  ["OBJ-01", "Planeación financiera", "% gastos no planificados", "≤5%", "Finanzas", "Reduce desviaciones financieras por gastos no contemplados."],
  ["OBJ-09", "Recursos humanos", "% cobertura vacantes planificadas", "≥95%", "Recursos humanos", "Asegura cobertura oportuna de vacantes planificadas."],
  ["OBJ-012", "Recursos humanos", "% cumplimiento plan anual capacitación", "≥90%", "Recursos humanos", "Fortalece competencias mediante capacitación anual."],
  ["OBJ-013", "Recursos humanos", "% ausentismo operativo", "≤3%", "Recursos humanos", "Favorece estabilidad mediante seguimiento de asistencia."],
  ["OBJ-013", "Recursos humanos", "% rotación personal", "≤10%", "Recursos humanos", "Favorece continuidad del personal."],
  ["OBJ-013", "Recursos humanos", "N° incidencias disciplinarias", "≤5", "Recursos humanos", "Controla incidencias relacionadas al cumplimiento interno."],
  ["OBJ-010", "Ingeniería/Desarrollo de productos", "% procesos productivos estandarizados", "≥80%", "Ingeniero de producto", "Favorece capacidad productiva escalable mediante estandarización."],
  ["OBJ-010", "Ingeniería/Desarrollo de productos", "% productos validados para fabricación", "≥80%", "Ingeniero de producto", "Libera productos compatibles con la capacidad productiva."],
  ["OBJ-013", "SST", "N° accidentes incapacitantes", "2", "Coordinador SST", "Previene accidentes y condiciones inseguras."],
  ["OBJ-04", "Todos los procesos", "% desviación presupuestal", "≤5%", "Finanzas", "Favorecen disciplina financiera mediante ejecución conforme al presupuesto."],
  ["OBJ-011", "Todos los procesos", "% cumplimiento metodología SIG", "≥90%", "Coordinador Estratégico/SIG", "Favorecen gestión estandarizada mediante metodología SIG."],
  ["OBJ-012", "Todos los procesos", "% cumplimiento plan desarrollo", "≥90%", "Analista de talento", "Favorecen desarrollo de competencias del personal."],
  ["OBJ-013", "Todos los procesos", "% acciones ejecutadas en tiempo", "≥90%", "Project Manager", "Favorecen compromiso organizacional mediante acciones oportunas."],
  ["OBJ-014", "Todos los procesos", "% uso herramientas digitales", "≥90%", "Analista de procesos", "Favorecen operación digital integrada y trazable."],
].map(([id, process, name, goal, responsible, impact]) => ({ id, process, name, goal, responsible, impact, status: "Sin evidencia" }));

const processLeaders = {
  "Planeación Estratégica": "Coordinador Estratégico/SIG",
  "Evaluación desempeño": "Coordinador Estratégico/SIG",
  Dirección: "Director general",
  Ventas: "Director general",
  Compras: "Gerente Operaciones",
  "Planeación producción": "Gerente Operaciones",
  "Planeación y control producción": "Gerente Operaciones",
  "Gestión inventarios": "Gerente Operaciones",
  "Control de almacenes": "Gerente Operaciones",
  Distribución: "Gerente Operaciones",
  Calidad: "Coordinador de Calidad",
  "Gestión calidad": "Coordinador de Calidad",
  "Producción/Calidad": "Gerente Operaciones / Coordinador de Calidad",
  "Desarrollo de productos": "Ingeniero de producto",
  "Ingeniería/Desarrollo de productos": "Ingeniero de producto",
  "Planeación financiera": "Finanzas",
  "Gestión competencias": "Analista de talento",
  "Recursos humanos": "Recursos humanos",
  SST: "Coordinador SST",
  Todos: "Transversal",
};

const sigRows = [
  ["4.1", "Comprensión de la organización y su contexto", "Planeación Estratégica", 10],
  ["4.1", "Comprensión de la organización y su contexto", "Dirección", 10],
  ["4.2", "Partes interesadas", "Planeación Estratégica", 10],
  ["4.2", "Partes interesadas", "Planeación Estratégica", 5],
  ["4.3", "Alcance del SIG", "Planeación Estratégica", 10],
  ["4.4", "Procesos del SIG", "Planeación Estratégica", 10],
  ["4.4", "Procesos del SIG", "Todos", 3],
  ["5.1", "Liderazgo y compromiso", "Dirección", 3],
  ["5.1", "Liderazgo y compromiso", "Dirección", 10],
  ["5.1.2", "Enfoque al cliente", "Ventas", 3],
  ["5.1.2", "Enfoque al cliente", "Ventas", 0],
  ["5.2", "Política", "Planeación Estratégica", 10],
  ["5.3", "Roles y responsabilidades", "Todos", 3],
  ["6.1", "Riesgos y oportunidades", "Planeación Estratégica", 5],
  ["6.1", "Riesgos y oportunidades", "Todos", 3],
  ["6.2", "Objetivos del SIG", "Planeación Estratégica", 10],
  ["6.2", "Objetivos del SIG", "Dirección", 3],
  ["6.3", "Cambios", "Planeación Estratégica", 10],
  ["6.3", "Cambios", "Planeación Estratégica", 0],
  ["7.1", "Recursos", "Dirección", 10],
  ["7.2", "Competencias", "Gestión competencias", 5],
  ["7.2", "Competencias", "Todos", 0],
  ["7.3", "Conciencia y comunicación", "Planeación Estratégica", 5],
  ["7.5", "Información documentada", "Planeación Estratégica", 10],
  ["7.5", "Información documentada", "Todos", 3],
  ["8.1", "Control operacional", "Planeación producción", 3],
  ["8.2", "Cliente", "Ventas", 5],
  ["8.3", "Diseño y desarrollo", "Desarrollo de productos", 5],
  ["8.4", "Proveedores externos", "Compras", 3],
  ["8.4", "Proveedores externos", "Compras", 5],
  ["8.5", "Producción controlada", "Planeación producción", 3],
  ["8.5", "Producción controlada", "Producción/Calidad", 3],
  ["8.6", "Liberación y no conformes", "Calidad", 3],
  ["9.1", "Seguimiento y medición", "Evaluación desempeño", 10],
  ["9.1", "Seguimiento y medición", "Todos", 0],
  ["9.2", "Auditoría interna", "Evaluación desempeño", 0],
  ["9.3", "Revisión por la dirección", "Dirección", 0],
  ["10.1", "Mejora", "Evaluación desempeño", 0],
  ["10.2", "Acción correctiva", "Evaluación desempeño", 0],
].map(([code, title, process, score]) => ({ code, title, process, score }));

const maturityPhases = [
  { key: "bpmn", label: "BPMN" },
  { key: "caracterizacion", label: "Caracterización" },
  { key: "documentacion", label: "Documentación" },
  { key: "validacion", label: "Validación" },
  { key: "implementacion", label: "Implementación" },
  { key: "digitalizacion", label: "Digitalización" },
  { key: "evaluacion", label: "Evaluación" },
  { key: "optimizacion", label: "Optimización" },
];

const maturityProcesses = [
  { name: "Planeación estratégica del SIG", type: "estratégico", leader: "Cristian", level: 3, phases: { bpmn: true, caracterizacion: true, documentacion: true, validacion: true, implementacion: true, digitalizacion: true } },
  { name: "Evaluación desempeño del SIG", type: "estratégico", leader: "Cristian", level: 3, phases: { bpmn: true, caracterizacion: true, documentacion: true, validacion: true, implementacion: true, digitalizacion: true } },
  { name: "Planeación financiera", type: "estratégico", leader: "Samantha", level: 2, phases: { bpmn: true, caracterizacion: true, documentacion: true } },
  { name: "Contabilidad y cumplimiento fiscal", type: "apoyo", leader: "Samantha", level: 2, phases: { implementacion: "warning" } },
  { name: "Gestión de competencias", type: "estratégico", leader: "Jacqueline", level: 2, phases: { bpmn: true, caracterizacion: true } },
  { name: "Ventas", type: "operativo", leader: "Alejandro", level: 2, phases: { bpmn: true, caracterizacion: true, documentacion: true, implementacion: "warning" } },
  { name: "Control de almacenes", type: "operativo", leader: "Hugo", level: 2, phases: { implementacion: "warning" } },
  { name: "Gestión de inventarios", type: "operativo", leader: "Hugo", level: 2, phases: { implementacion: "warning" } },
  { name: "Planeación y control de la producción", type: "operativo", leader: "Hugo", level: 2, phases: { bpmn: true, caracterizacion: true, implementacion: "warning" } },
  { name: "Compras", type: "operativo", leader: "Hugo", level: 2, phases: { bpmn: true, implementacion: "warning" } },
  { name: "Distribución", type: "operativo", leader: "Hugo", level: 2, phases: { implementacion: "warning" } },
  { name: "Ingeniería/Desarrollo de productos", type: "operativo", leader: "Beatriz", level: 0, phases: {} },
  { name: "Gestión de calidad", type: "operativo", leader: "Beatriz", level: 0, phases: {} },
  { name: "Recursos humanos", type: "apoyo", leader: "Aurora", level: 2, phases: { bpmn: true, caracterizacion: true, implementacion: "warning" } },
  { name: "Gestión de SST", type: "apoyo", leader: "Aurora", level: 2, phases: { bpmn: true, caracterizacion: true, documentacion: true, implementacion: "warning" } },
  { name: "Transformación digital", type: "apoyo", leader: "Elizabeth", level: 2, phases: { implementacion: "warning" } },
];

const maturityLevelLabels = { 0: "No iniciado", 1: "Inicial", 2: "Administrada", 3: "Estandarizada", 4: "Predecible", 5: "Optimizada" };
const allKpis = baseKpis;
const transversalKpis = allKpis.filter((kpi) => kpi.process === "Todos los procesos");

function normalizeResponsible(label) {
  return String(label).split(" - ")[0].trim();
}

function roleMatchesResponsible(role, responsible) {
  return String(role).split("/").map((part) => part.trim()).includes(responsible);
}

function sigRiskFromAverage(avg) {
  if (avg >= 8) return "Bajo";
  if (avg >= 5) return "Medio";
  if (avg > 0) return "Alto";
  return "Crítico";
}

function sigStatusFromAverage(avg) {
  if (avg >= 8) return "Estandarizado";
  if (avg >= 5) return "Implementado";
  if (avg > 0) return "En desarrollo";
  return "No implementado";
}

function getSigRowsForResponsible(responsible) {
  const rows = sigRows.filter((row) => {
    if (responsible === "Coordinador Estratégico/SIG" && row.process === "Evaluación desempeño") return true;
    if (row.process === "Todos") return true;
    return roleMatchesResponsible(processLeaders[row.process] || "Por asignar", responsible);
  });

  const grouped = rows.reduce((acc, row) => {
    if (!acc[row.code]) acc[row.code] = { code: row.code, title: row.title, processes: new Set(), total: 0, criteria: 0, critical: 0 };
    acc[row.code].processes.add(row.process === "Todos" ? "Todos los procesos" : row.process);
    acc[row.code].total += row.score;
    acc[row.code].criteria += 1;
    if (row.score <= 3) acc[row.code].critical += 1;
    return acc;
  }, {});

  return Object.values(grouped).map((item) => {
    const avg = item.criteria ? item.total / item.criteria : 0;
    return {
      code: item.code,
      title: item.title,
      process: [...item.processes].slice(0, 3).join(" / "),
      criteria: item.criteria,
      score: Math.round((avg / 10) * 100),
      status: sigStatusFromAverage(avg),
      risk: sigRiskFromAverage(avg),
      critical: item.critical,
    };
  });
}

function getResponsibleData(label) {
  const responsible = normalizeResponsible(label);
  const profile = responsibleProfile[responsible] || { person: "Por asignar", area: "Responsable incluido en la lista oficial." };
  const directKpis = allKpis.filter((kpi) => kpi.responsible === responsible);
  const mergedKpis = [...directKpis, ...transversalKpis.filter((kpi) => !directKpis.some((direct) => direct.name === kpi.name))];

  return { responsible, person: profile.person, area: profile.area, kpis: mergedKpis, sig: getSigRowsForResponsible(responsible) };
}

function getSigRiskFromPercent(percent) {
  if (percent >= 80) return "Bajo";
  if (percent >= 50) return "Medio";
  if (percent > 0) return "Alto";
  return "Crítico";
}

function getRiskTone(risk) {
  if (risk === "Crítico" || risk === "Sin evidencia") return "text-rose-700 bg-rose-50 border-rose-200";
  if (risk === "Alto") return "text-orange-700 bg-orange-50 border-orange-200";
  if (risk === "Medio" || risk === "En ejecución") return "text-amber-700 bg-amber-50 border-amber-200";
  if (risk === "Pendiente") return "text-slate-500 bg-slate-100 border-slate-200";
  return "text-emerald-700 bg-emerald-50 border-emerald-200";
}

function getStatusForKpi(status) {
  if (status === "Sin evidencia" || status === "Crítico") return "Crítico";
  if (status === "En ejecución") return "Medio";
  return "Controlado";
}

function getMaturityRowsForResponsible(label) {
  const responsible = normalizeResponsible(label);
  const person = responsibleProfile[responsible]?.person;
  return maturityProcesses.filter((process) => process.leader === person);
}

function isPhaseDone(value) {
  return value === true || value === "warning";
}

function calculateMaturityLevel(phases) {
  if (isPhaseDone(phases.optimizacion)) return 5;
  if (isPhaseDone(phases.evaluacion)) return 4;
  if (isPhaseDone(phases.validacion)) return 3;

  const baseCompleted = ["bpmn", "caracterizacion", "documentacion", "implementacion", "digitalizacion"].filter((key) => isPhaseDone(phases[key])).length;
  if (baseCompleted >= 3) return 2;
  if (baseCompleted >= 1) return 1;
  return 0;
}

function getPhaseHeaderClass(phaseKey) {
  if (phaseKey === "validacion") return "bg-slate-100 text-amber-600 border-x border-slate-200";
  if (phaseKey === "evaluacion") return "bg-slate-100 text-emerald-600 border-x border-slate-200";
  if (phaseKey === "optimizacion") return "bg-slate-100 text-yellow-600 border-x border-slate-200";
  return "bg-slate-100 text-slate-600";
}

function getPhaseCellClass(phaseKey) {
  if (phaseKey === "validacion") return "bg-amber-50 border-x border-amber-100";
  if (phaseKey === "evaluacion") return "bg-emerald-50 border-x border-emerald-200";
  if (phaseKey === "optimizacion") return "bg-yellow-50 border-x border-yellow-200";
  return "";
}

function getMaturityLevelTone(level) {
  if (level >= 4) return "text-blue-700";
  if (level === 3) return "text-amber-700";
  if (level === 2) return "text-orange-600";
  if (level === 1) return "text-red-600";
  return "text-slate-400";
}

function PhaseCheck({ value }) {
  const checked = value === true;
  const warning = value === "warning";
  return (
    <div className="relative inline-flex justify-center">
      <div className={`flex h-5 w-5 items-center justify-center rounded-md border text-[11px] font-black ${warning ? "border-amber-300 bg-amber-100 text-emerald-700" : checked ? "border-emerald-300 bg-emerald-100 text-emerald-700" : "border-slate-200 bg-white text-slate-400"}`} title={warning ? "Implementado sin validación" : checked ? "Completado" : "Pendiente"}>
        {checked || warning ? "✓" : ""}
      </div>
      {warning && <span className="absolute -bottom-[2px] -right-[1px] text-[7px] font-black leading-none text-amber-700">⚠</span>}
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
        <div className="h-full rounded-full bg-slate-700" style={{ width: `${value}%` }} />
      </div>
      <div className="w-10 text-right text-xs font-black text-slate-700">{value}%</div>
    </div>
  );
}

function AccordionSection({ title, subtitle, count, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-4 border-b border-slate-800 bg-[#111827] px-5 py-3 text-left">
        <div>
          <div className="text-sm font-black uppercase tracking-wide text-white">{title}</div>
          <div className="text-xs font-semibold text-slate-400">{subtitle}</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] font-black text-white">{count}</span>
          <span className="text-lg font-black text-white">{open ? "−" : "+"}</span>
        </div>
      </button>
      {open ? <div>{children}</div> : null}
    </section>
  );
}

function runVistaResponsableTests() {
  console.assert(ADMIN_PASSWORD === "vikingo2025", "La clave administrativa debe estar centralizada");
  console.assert(realResponsibleList.length === 11, "La lista oficial debe incluir 11 responsables");
  console.assert(getResponsibleData("Gerente Operaciones").person === "Hugo", "Gerente Operaciones debe estar vinculado a Hugo");
  console.assert(getResponsibleData("Finanzas").kpis.length >= 7, "Finanzas debe incluir KPIs directos y transversales");
  console.assert(getResponsibleData("Gerente Operaciones").kpis.length >= 21, "Gerente Operaciones debe incluir KPIs directos y transversales");
  console.assert(getResponsibleData("Director general").sig.some((item) => item.code === "5.1.2"), "Director general debe incluir enfoque al cliente");
  console.assert(getResponsibleData("Coordinador de Calidad").sig.some((item) => item.code === "8.6"), "Calidad debe incluir liberación y no conformes");
  console.assert(getResponsibleData("Gerente Operaciones").sig.some((item) => item.code === "8.4"), "Gerente Operaciones debe incluir proveedores externos");
  console.assert(getResponsibleData("Coordinador Estratégico/SIG").sig.some((item) => item.code === "9.2"), "Coordinador Estratégico/SIG debe incluir auditoría interna");
  console.assert(getMaturityRowsForResponsible("Gerente Operaciones - Hugo").length >= 5, "Hugo debe mostrar varios procesos en madurez");
  console.assert(calculateMaturityLevel({ bpmn: true, caracterizacion: true }) === 1, "Avance inicial sin validación debe dar nivel 1");
  console.assert(calculateMaturityLevel({ bpmn: true, caracterizacion: true, documentacion: true }) === 2, "Tres avances base sin validación deben dar nivel 2");
  console.assert(calculateMaturityLevel({ validacion: true }) === 3, "Validación palomeada debe dar nivel 3");
  console.assert(calculateMaturityLevel({ evaluacion: true }) === 4, "Evaluación palomeada debe dar nivel 4");
  console.assert(calculateMaturityLevel({ optimizacion: true }) === 5, "Optimización palomeada debe dar nivel 5");
  console.assert(calculateMaturityLevel({}) === 0, "Sin fases completas debe dar madurez nivel 0");
}

runVistaResponsableTests();

export default function VistaResponsableDesplegable() {
  const [selectedResponsible, setSelectedResponsible] = useState("Coordinador Estratégico/SIG - Cristian");
  const [adminEditMode, setAdminEditMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [sigStatusOverrides, setSigStatusOverrides] = useState({});
  const [kpiStatusOverrides, setKpiStatusOverrides] = useState({});
  const [maturityOverrides, setMaturityOverrides] = useState({});
  const [selectedKpi, setSelectedKpi] = useState(null);
  const [selectedSig, setSelectedSig] = useState(null);

  const active = useMemo(() => {
    const data = getResponsibleData(selectedResponsible);
    const responsibleKey = normalizeResponsible(selectedResponsible);
    return {
      ...data,
      kpis: data.kpis.map((kpi) => {
        const key = `${responsibleKey}-${kpi.id}-${kpi.name}`;
        return { ...kpi, status: kpiStatusOverrides[key] || kpi.status };
      }),
    };
  }, [selectedResponsible, kpiStatusOverrides]);

  const activeSig = useMemo(() => {
    const responsibleKey = normalizeResponsible(selectedResponsible);
    return active.sig.map((item) => {
      const key = `${responsibleKey}-${item.code}`;
      const overrideScore = sigStatusOverrides[key];
      if (overrideScore === undefined) return item;
      return {
        ...item,
        score: overrideScore,
        risk: getSigRiskFromPercent(overrideScore),
        status: overrideScore >= 80 ? "Estandarizado" : overrideScore >= 50 ? "Implementado" : overrideScore > 0 ? "En desarrollo" : "No implementado",
      };
    });
  }, [active.sig, selectedResponsible, sigStatusOverrides]);

  const maturityRows = useMemo(() => {
    const responsibleKey = normalizeResponsible(selectedResponsible);
    return getMaturityRowsForResponsible(selectedResponsible).map((process) => {
      const key = `${responsibleKey}-${process.name}`;
      const phases = maturityOverrides[key] || process.phases;
      return { ...process, phases, level: calculateMaturityLevel(phases) };
    });
  }, [selectedResponsible, maturityOverrides]);

  const globalEditControls = (
    <div className="flex items-center gap-2">
      <input
        type="password"
        value={adminPassword}
        onChange={(event) => setAdminPassword(event.target.value)}
        placeholder="Clave adm."
        className="h-9 w-28 rounded-xl border border-slate-200 bg-white px-3 text-[11px] font-bold text-slate-600 outline-none focus:border-slate-400"
      />
      <button
        type="button"
        onClick={() => adminPassword === ADMIN_PASSWORD && setAdminEditMode((value) => !value)}
        className={`h-9 rounded-xl px-3 text-[10px] font-black uppercase tracking-wide ${adminEditMode ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"}`}
      >
        {adminEditMode ? "Admin activo" : "Editar"}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f5f7] p-5 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-4">
        <section className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">Vista responsable</div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-black tracking-tight text-slate-900">Cumplimiento integral por responsable</h1>
                {globalEditControls}
              </div>
              <p className="mt-1 text-sm font-medium text-slate-500">KPIs, madurez organizacional y subnumerales del SIG aplicables.</p>
            </div>
            <select value={selectedResponsible} onChange={(event) => setSelectedResponsible(event.target.value)} className="min-w-[320px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 outline-none focus:border-slate-400">
              {realResponsibleList.map((resp) => <option key={resp} value={resp}>{resp}</option>)}
            </select>
          </div>
        </section>

        <AccordionSection title="KPIs conectados" subtitle="Indicadores asignados directa o transversalmente" count={`${active.kpis.length} registros`} defaultOpen>
          <div className="overflow-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead className="bg-slate-100">
                <tr className="border-b border-slate-200">
                  <th className="w-24 px-5 py-3 text-left text-[11px] font-black uppercase tracking-wide text-slate-500">ID</th>
                  <th className="w-32 px-5 py-3 text-left text-[11px] font-black uppercase tracking-wide text-slate-500">Proceso</th>
                  <th className="w-[520px] px-5 py-3 text-left text-[11px] font-black uppercase tracking-wide text-slate-500">KPI</th>
                  <th className="w-28 px-5 py-3 text-left text-[11px] font-black uppercase tracking-wide text-slate-500">Meta 2026</th>
                  <th className="w-32 px-5 py-3 text-left text-[11px] font-black uppercase tracking-wide text-slate-500">Responsable medición</th>
                  <th className="w-44 px-5 py-3 text-center text-[11px] font-black uppercase tracking-wide text-slate-500">Estado</th>
                </tr>
              </thead>
              <tbody>
                {active.kpis.map((kpi) => (
                  <tr key={`${kpi.id}-${kpi.process}-${kpi.name}`} className={`border-b border-slate-100 hover:bg-slate-50/70 ${kpi.process === "Todos los procesos" ? "bg-sky-50/50" : ""}`}>
                    <td className="whitespace-nowrap px-5 py-3 font-black text-slate-700">
                      <span className="group relative inline-flex cursor-default rounded-md bg-slate-200 px-2.5 py-1 text-[11px] font-black tracking-wide text-slate-700">
                        {kpi.id}
                        <span className="pointer-events-none absolute left-0 top-full z-50 mt-2 hidden w-64 rounded-lg bg-black px-3 py-2 text-[11px] font-bold leading-relaxed text-white shadow-2xl group-hover:block">
                          {objectiveNames[kpi.id] || "Objetivo estratégico"}
                        </span>
                      </span>
                    </td>
                    <td className={`px-5 py-3 text-xs font-black ${kpi.process === "Todos los procesos" ? "text-sky-700" : "text-slate-500"}`}>{kpi.process}</td>
                    <td className="px-5 py-3">
                      <button type="button" onClick={() => setSelectedKpi(kpi)} className="text-left font-black text-slate-800 underline-offset-4 hover:text-slate-950 hover:underline">{kpi.name}</button>
                    </td>
                    <td className="px-5 py-3 font-semibold text-slate-500">{kpi.goal}</td>
                    <td className="px-5 py-3 font-medium text-slate-600">{kpi.responsible}</td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className={`rounded-xl border px-2.5 py-[5px] text-[10px] font-black whitespace-nowrap ${getRiskTone(getStatusForKpi(kpi.status))}`}>{kpi.status}</span>
                        {adminEditMode && (
                          <div className="flex flex-wrap justify-center gap-1">
                            {["Controlado", "En ejecución", "Sin evidencia"].map((status) => (
                              <button
                                key={status}
                                type="button"
                                onClick={() => {
                                  const key = `${normalizeResponsible(selectedResponsible)}-${kpi.id}-${kpi.name}`;
                                  setKpiStatusOverrides((current) => ({ ...current, [key]: status }));
                                }}
                                className={`rounded-md border px-2 py-1 text-[9px] font-black ${getRiskTone(getStatusForKpi(status))}`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AccordionSection>

        <AccordionSection title="Subnumerales SIG" subtitle="Requisitos HLS relacionados con el responsable" count={`${activeSig.length} subnumerales`} defaultOpen>
          <div className="overflow-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="bg-slate-100">
                <tr className="border-b border-slate-200">
                  <th className="w-24 px-5 py-3 text-left text-[11px] font-black uppercase tracking-wide text-slate-500">Código</th>
                  <th className="px-5 py-3 text-left text-[11px] font-black uppercase tracking-wide text-slate-500">Subnumeral</th>
                  <th className="w-64 px-5 py-3 text-left text-[11px] font-black uppercase tracking-wide text-slate-500">Proceso</th>
                  <th className="w-24 px-5 py-3 text-center text-[11px] font-black uppercase tracking-wide text-slate-500">Criterios</th>
                  <th className="w-52 px-5 py-3 text-left text-[11px] font-black uppercase tracking-wide text-slate-500">Cumplimiento</th>
                  <th className="w-32 px-5 py-3 text-center text-[11px] font-black uppercase tracking-wide text-slate-500">Riesgo</th>
                </tr>
              </thead>
              <tbody>
                {activeSig.map((item) => (
                  <tr key={`${item.code}-${item.process}`} className={`border-b border-slate-100 hover:bg-slate-50/70 ${item.process.includes("Todos los procesos") ? "bg-sky-50/50" : ""}`}>
                    <td className="px-5 py-3 font-black text-slate-700">{item.code}</td>
                    <td className="px-5 py-3">
                      <button type="button" onClick={() => setSelectedSig(item)} className="text-left font-semibold text-slate-800 underline-offset-4 hover:text-slate-950 hover:underline">{item.title}</button>
                    </td>
                    <td className={`px-5 py-3 text-xs font-semibold ${item.process.includes("Todos los procesos") ? "text-sky-700" : "text-slate-500"}`}>{item.process}</td>
                    <td className="px-5 py-3 text-center font-black text-slate-600">{item.criteria}</td>
                    <td className="px-5 py-3">
                      <div className="space-y-2">
                        <ProgressBar value={item.score} />
                        {adminEditMode && (
                          <div className="flex items-center gap-2">
                            {[
                              { label: "Cumple", score: 100, cls: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
                              { label: "Parcial", score: 50, cls: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100" },
                              { label: "No cumple", score: 0, cls: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100" },
                            ].map((option) => (
                              <button key={option.label} type="button" onClick={() => {
                                const key = `${normalizeResponsible(selectedResponsible)}-${item.code}`;
                                setSigStatusOverrides((current) => ({ ...current, [key]: option.score }));
                              }} className={`rounded-lg border px-2 py-1 text-[10px] font-black ${option.cls}`}>{option.label}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-center"><span className={`rounded-xl border px-3 py-1 text-[11px] font-black ${getRiskTone(item.risk)}`}>{item.risk}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AccordionSection>

        <AccordionSection title="Madurez organizacional" subtitle="Heatmap de implementación filtrado por persona" count={`${maturityRows.length} procesos`} defaultOpen>
          <div className="overflow-auto">
            <table className="w-full min-w-[1040px] text-[11px]">
              <thead className="bg-slate-100">
                <tr className="border-b border-slate-200">
                  <th className="w-12 px-3 py-2 text-left font-black text-slate-500">N°</th>
                  <th className="w-[230px] px-3 py-2 text-left font-black text-slate-500">Proceso</th>
                  <th className="w-20 px-2 py-2 text-center font-black text-slate-500">Nivel</th>
                  <th className="w-28 px-2 py-2 text-left font-black text-slate-500">Líder</th>
                  {maturityPhases.map((phase) => (
                    <th key={phase.key} className={`w-[92px] px-1 py-2 text-center font-black uppercase ${getPhaseHeaderClass(phase.key)}`}>
                      <div className="text-[9px] leading-tight">{phase.label}</div>
                      {(phase.key === "validacion" || phase.key === "evaluacion" || phase.key === "optimizacion") && <div className="mt-[2px] text-[10px] leading-none">{phase.key === "optimizacion" ? "🏆" : "🚩"}</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {maturityRows.map((process, index) => (
                  <tr key={process.name} className="hover:bg-slate-50/70">
                    <td className="px-3 py-2 font-black text-slate-500">{index + 1}</td>
                    <td className="px-3 py-2"><div className="font-black leading-tight text-slate-900">{process.name}</div><div className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-slate-400">{process.type}</div></td>
                    <td className="px-2 py-2 text-center"><div className={`text-base font-black ${getMaturityLevelTone(process.level)}`}>{process.level}</div><div className="text-[8px] font-bold text-slate-400">{maturityLevelLabels[process.level]}</div></td>
                    <td className="px-2 py-2 font-semibold text-slate-600">{process.leader}</td>
                    {maturityPhases.map((phase) => (
                      <td key={phase.key} className={`px-1 py-2 text-center ${getPhaseCellClass(phase.key)}`}>
                        <button
                          type="button"
                          disabled={!adminEditMode}
                          onClick={() => {
                            if (!adminEditMode) return;
                            const responsibleKey = normalizeResponsible(selectedResponsible);
                            const key = `${responsibleKey}-${process.name}`;
                            setMaturityOverrides((current) => {
                              const currentPhases = current[key] || process.phases;
                              const currentValue = currentPhases[phase.key];
                              return { ...current, [key]: { ...currentPhases, [phase.key]: currentValue === true || currentValue === "warning" ? false : true } };
                            });
                          }}
                          className={adminEditMode ? "cursor-pointer" : "cursor-default"}
                        >
                          <PhaseCheck value={process.phases[phase.key]} />
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
                {maturityRows.length === 0 && <tr><td colSpan={12} className="px-5 py-6 text-center text-sm font-semibold text-slate-400">Sin procesos de madurez vinculados para esta persona.</td></tr>}
              </tbody>
            </table>
          </div>
        </AccordionSection>
      </div>

      {selectedSig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-[4px]">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 bg-[#111827] px-5 py-4 text-white">
              <div><div className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">Detalle del subnumeral ISO</div><div className="mt-1 text-base font-black leading-tight">{selectedSig.code} · {selectedSig.title}</div></div>
              <button type="button" onClick={() => setSelectedSig(null)} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-lg font-black hover:bg-white/20">×</button>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm"><div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Enfoque del requisito</div><div className="mt-3 text-[15px] font-semibold leading-8 text-slate-700">{sigDescriptions[selectedSig.code]?.focus || "Requisito aplicable al SIG."}</div></div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-[10px] font-black uppercase tracking-wide text-slate-400">Qué exige en la práctica</div><div className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{sigDescriptions[selectedSig.code]?.expects || "Debe demostrarse con controles y evidencia objetiva."}</div></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-[10px] font-black uppercase tracking-wide text-slate-400">Evidencia esperada</div><div className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{sigDescriptions[selectedSig.code]?.evidence || "Registros, procedimientos, indicadores y seguimiento."}</div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedKpi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-[4px]">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 bg-[#111827] px-5 py-4 text-white"><div><div className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">Detalle del KPI</div><div className="mt-1 text-base font-black leading-tight">{selectedKpi.name}</div></div><button type="button" onClick={() => setSelectedKpi(null)} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-lg font-black hover:bg-white/20">×</button></div>
            <div className="space-y-4 p-5">
              <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm"><div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Descripción / impacto</div><div className="mt-4 text-[15px] font-semibold leading-8 text-slate-700">{selectedKpi.impact}</div></div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><div className="text-[10px] font-black uppercase tracking-wide text-slate-400">Objetivo</div><div className="mt-1 font-black text-slate-800">{selectedKpi.id}</div><div className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{objectiveNames[selectedKpi.id] || "Objetivo estratégico"}</div></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><div className="text-[10px] font-black uppercase tracking-wide text-slate-400">Meta 2026</div><div className="mt-1 font-black text-slate-800">{selectedKpi.goal}</div><div className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">Responsable: {selectedKpi.responsible}</div></div>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-500"><span>Proceso</span><span className={selectedKpi.process === "Todos los procesos" ? "text-sky-700" : "text-slate-700"}>{selectedKpi.process}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
