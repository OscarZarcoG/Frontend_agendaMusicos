export interface BaseModel {
  id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Cliente extends BaseModel {
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  codigo_postal: string;
  tipo_cliente: 'particular' | 'empresa' | 'organizacion';
  empresa: string;
  nif_cif: string;
  observaciones: string;
  redes_sociales: string;
  frecuencia: 'frecuente' | 'regular' | 'ocasional';
  // Campos calculados del backend
  nombre_completo: string;
  es_empresa: boolean;
}

export interface EquipoAudio extends BaseModel {
  nombre: string;
  tipo: 'altavoces' | 'microfonos' | 'mezcladores' | 'amplificadores' | 'instrumentos' | 'iluminacion' | 'cables' | 'soportes' | 'otros';
  marca: string;
  modelo: string;
  numero_serie: string;
  estado: 'disponible' | 'en_uso' | 'mantenimiento' | 'averiado' | 'vendido';
  precio_compra: number | null;
  fecha_compra: string | null;
  garantia_hasta: string | null;
  ubicacion: string;
  observaciones: string;
  // Campos legacy
  numero_bocinas: number | null;
  descripcion: string;
  imagen: string | null;
}

export interface Catering extends BaseModel {
  peticion_grupo: string;
}

export interface Peticion extends BaseModel {
  nombre_cancion: string;
  link: string | null;
}

export interface Repertorio extends BaseModel {
  nombre_cancion: string;
  artista: string;
  genero: string;
  duracion: string;
  link: string | null;
}

export interface FotosEvento extends BaseModel {
  nombre_foto: string; 
  fecha_foto: string;  
  foto: string;
}

export interface Contrato extends BaseModel {
  // Información básica
  numero_contrato: string;
  estado_evento: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  titulo: string;
  tipo_evento: 'birthday' | 'wedding' | 'quinceañera' | 'baptism' | 'communion' | 'graduation' | 'anniversary' | 'corporate' | 'baby_shower' | 'bridal_shower' | 'christmas' | 'new_year' | 'other';
  nombre_festejado: string;
  notas: string;
  
  // Fecha y hora
  fecha_evento: string;
  hora_inicio: string;
  hora_final: string;
  tiempo_total: number | null;
  
  // Descansos
  oportunidades_descanso: number | null;
  tiempo_descanso: number | null;
  descripcion_descanso: string | null;
  
  // Lugar
  nombre_lugar: string;
  descripcion_lugar: string;
  google_maps_url: string;
  fotos_lugar: string | null;
  
  // Información financiera
  pago_total: number;
  costo_hora: number;
  pago_adelanto: number;
  pago_restante: number;
  porcentaje: number;
  costo_extra: number;
  
  // Relaciones
  cliente: number | null;
  audiencia: number;
  equipo_audio: number | null;
  catering: number | null;
  peticiones_cliente: number[];
  
  // Campos expandidos para cuando necesites los objetos completos
  cliente_data?: Cliente;
  equipo_audio_data?: EquipoAudio;
  catering_data?: Catering;
  peticiones_cliente_data?: Peticion[];
}

export type ClienteCreateInput = Omit<Cliente, keyof BaseModel | 'nombre_completo' | 'es_empresa'>;

export type ClienteUpdateInput = Partial<ClienteCreateInput>;

export type ContratoCreateInput = Pick<Contrato, 
  | 'titulo' 
  | 'tipo_evento' 
  | 'nombre_festejado' 
  | 'notas'
  | 'fecha_evento'
  | 'hora_inicio' 
  | 'hora_final'
  | 'oportunidades_descanso'
  | 'tiempo_descanso'
  | 'descripcion_descanso'
  | 'nombre_lugar'
  | 'descripcion_lugar'
  | 'google_maps_url'
  | 'costo_hora'
  | 'pago_adelanto'
  | 'costo_extra'
  | 'cliente'
  | 'audiencia'
  | 'equipo_audio'
  | 'catering'
  | 'peticiones_cliente'
> & {
  fotos_lugar?: File | null;
};

export type ContratoUpdateInput = Partial<ContratoCreateInput>;

export type EquipoAudioCreateInput = Omit<EquipoAudio, keyof BaseModel> & {
  imagen?: File | null;
};

export type EquipoAudioUpdateInput = Partial<EquipoAudioCreateInput>;

// ========== TIPOS PARA RESPUESTAS DE API ==========

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ========== TIPOS PARA FILTROS ==========

export interface ClienteFilters {
  search?: string;
  tipo_cliente?: Cliente['tipo_cliente'];
  frecuencia?: Cliente['frecuencia'];
  ordering?: string;
}

export interface ContratoFilters {
  search?: string;
  estado_evento?: Contrato['estado_evento'];
  tipo_evento?: Contrato['tipo_evento'];
  fecha_evento_after?: string;
  fecha_evento_before?: string;
  cliente?: number;
  ordering?: string;
}

// ========== TIPOS UTILITARIOS ==========

export interface SelectOption<T = string> {
  value: T;
  label: string;
}

// Opciones para selects basadas en los choices del modelo
export const TIPO_CLIENTE_OPTIONS: SelectOption<Cliente['tipo_cliente']>[] = [
  { value: 'particular', label: 'Particular' },
  { value: 'empresa', label: 'Empresa' },
  { value: 'organizacion', label: 'Organización' },
];

export const FRECUENCIA_OPTIONS: SelectOption<Cliente['frecuencia']>[] = [
  { value: 'frecuente', label: 'Frecuente' },
  { value: 'regular', label: 'Regular' },
  { value: 'ocasional', label: 'Ocasional' },
];

export const ESTADO_EVENTO_OPTIONS: SelectOption<Contrato['estado_evento']>[] = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'confirmed', label: 'Confirmado' },
  { value: 'in_progress', label: 'En progreso' },
  { value: 'completed', label: 'Completado' },
  { value: 'cancelled', label: 'Cancelado' },
];

// ========== VALIDACIONES Y ERRORES ==========

export interface ApiError {
  errors: Record<string, string[]>;
  message: string;
  status: number;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
}