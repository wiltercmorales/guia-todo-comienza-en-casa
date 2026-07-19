// 10 semanas de contenido (Semanas 2 a 11)
// Cada semana tiene 7 días: 1=Sábado, 2=Domingo, 3=Lunes, 4=Martes, 5=Miércoles, 6=Jueves, 7=Viernes

export const MAP_WEEKS = [
  { id: 2, name: 'El regalo es Jesús', icon: '🎁', color: 'sky' },
  { id: 3, name: 'Adorar al niño Jesús', icon: '🙏', color: 'gold' },
  { id: 4, name: 'Cuidar al niño Jesús', icon: '🛡️', color: 'rose' },
  { id: 5, name: 'En Nazaret', icon: '🏠', color: 'forest' },
  { id: 6, name: 'En el río Jordán', icon: '💧', color: 'sky' },
  { id: 7, name: 'Victoria en el desierto', icon: '🏆', color: 'gold' },
  { id: 8, name: 'Llamados a seguir a Jesús', icon: '👣', color: 'rose' },
  { id: 9, name: '¡Se agotó el jugo de uva!', icon: '🍇', color: 'forest' },
  { id: 10, name: 'Jesús alimenta a la multitud', icon: '🍞', color: 'sky' },
  { id: 11, name: 'Discípulos en formación', icon: '🌿', color: 'gold' },
]

export const DAILY_CONTENT = {
  // === SEMANA 2 - El regalo es Jesús ===
  '2': [
    {
      dayId: 1,
      dayName: 'SÁBADO',
      bibleStudy: 'La Creación',
      bibleBase: 'Lucas 2:1-7',
      verse: 'Dios amó tanto al mundo que dio a su único Hijo, para que todo el que crea en él no se pierda, sino que tenga vida eterna. (Juan 3:16)',
      word: 'Agradecer - Significa apreciar. Comprender y aceptar el valor de una persona, un acto o un objeto.',
      message: 'Jesús es el regalo precioso de Dios para mí.'
    },
    {
      dayId: 2,
      dayName: 'DOMINGO',
      bibleStudy: 'El hermoso jardín',
      title: '🌞 DOMINGO - Un regalo prometido',
      story: 'El vientre de María crecía cada vez más. El Salvador prometido por Dios crecía dentro de ella. Dios había prometido un Salvador mucho tiempo antes, cuando habló con Adán y Eva en el Jardín del Edén después de que pecaron.',
      think: '¿Mira a tu alrededor y fíjate en los regalos que otros te han dado? ¿Cuánto más valioso es el regalo de Jesús para ti?',
      prayer: 'Agradece a Dios porque siempre cumple sus promesas.'
    },
    {
      dayId: 3,
      dayName: 'LUNES',
      bibleStudy: 'La desobediencia del hombre',
      title: '🌞 LUNES - Un accidentado paseo en burro',
      story: 'Los mensajeros corrían difundiendo una noticia importante para César Augusto. José y María tendrían que viajar a Belén. Tendrían que recorrer 112 kilómetros desde Nazaret. Dios le había dicho al profeta Miqueas que su Hijo iba a nacer en Belén.',
      think: '¿Cómo se aplica el versículo a esta historia? ¿Qué significaría para ti entregarte a Dios?',
      prayer: 'Pídele a Dios que te ayude a valorar las palabras maravillosas de la Biblia.'
    },
    {
      dayId: 4,
      dayName: 'MARTES',
      bibleStudy: 'Caín y Abel',
      title: '🌞 MARTES - No hay lugar',
      story: 'El sol caía con fuerza. José y María entraron por las puertas de la ciudad. Se unieron a la multitud de personas que buscaban un lugar donde alojarse. Cansados y sin hogar, preguntaban dónde dormir. Pero la respuesta siempre era no.',
      think: '¿Cómo te habrías sentido si hubieras sido María o José? ¿Cómo puedes hacer sentir bienvenido a alguien?',
      fact: 'Belén significa "Casa del Pan", y allí nació Jesús, quien dijo: "Yo soy el pan de vida".',
      prayer: 'Pídele a Jesús que siempre tenga un lugar especial en tu corazón.'
    },
    {
      dayId: 5,
      dayName: 'MIÉRCOLES',
      bibleStudy: 'El arca de Noé',
      title: '🌞 MIÉRCOLES - Un lugar para descansar',
      story: 'Una vaca mugió y una oveja baló. José abría la puerta del establo con la lámpara. Por fin habían encontrado un lugar donde quedarse: un establo. Prepararon una cama cómoda sobre paja limpia entre los animales. Estaban contentos porque confiaban en Dios.',
      think: '¿Por qué Jesús decidió nacer en un lugar tan sencillo? ¿Qué nos enseña su humildad?',
      todo: 'Dibuja el pesebre o prepara un pequeño nacimiento con materiales que tengas en casa.',
      prayer: 'Agradece a Jesús porque vino al mundo para salvarte.'
    },
    {
      dayId: 6,
      dayName: 'JUEVES',
      bibleStudy: 'El diluvio',
      title: '🌞 JUEVES - El mejor regalo',
      story: 'Reflexiona sobre el significado del nacimiento de Jesús. El gran regalo de la salvación que Dios ofrece a cada persona. Jesús es el regalo más grande que Dios ha dado al mundo y su amor continúa transformando vidas.',
      think: '¿Por qué el regalo de Jesús es diferente? ¿Cómo puedes demostrar que aprecias ese regalo?',
      todo: 'Haz una tarjeta de agradecimiento para Jesús o para una persona que haya sido una bendición.',
      prayer: 'Dale gracias a Dios por todas las bendiciones que recibes cada día.'
    },
    {
      dayId: 7,
      dayName: 'VIERNES',
      bibleStudy: 'La torre de Babel',
      title: '🌞 VIERNES - Gracias por Jesús',
      story: 'Recuerda que Jesús es el regalo más grande que Dios ha dado. Su amor continúa transformando vidas. Esta semana hemos aprendido cómo Dios cumple sus promesas.',
      think: '¿Qué significa para ti recibir el regalo ofrendado de Jesús? ¿Cómo puedes compartir ese regalo con otras personas?',
      share: 'Hablen en familia sobre las bendiciones. Cada integrante mencione algo por lo cual está agradecido. Canten un himno de gratitud.',
      journal: '¿Qué aprendiste esta semana del amor de Dios? ¿Qué fue lo que más te gustó de la historia del nacimiento?',
      prayer: 'Agradezcan juntos a Dios porque Jesús es el regalo más precioso.'
    }
  ],

  // === SEMANA 3 - Adorar al niño Jesús ===
  '3': [
    {
      dayId: 1,
      dayName: 'SÁBADO',
      bibleStudy: 'Dios llama a Abraham',
      bibleBase: 'Lucas 2:8-40',
      verse: '¡Aleluya! Alabaré al Señor con toda mi alma. Alabaré al Señor mientras yo viva; cantaré himnos a mi Dios mientras yo exista (Salmo 146:1-2, DHH)',
      word: 'Dedicado - Estar comprometido, ser leal o estar apegado a alguien o algo.',
      message: 'Jesús es digno de mi alabanza y adoración.'
    },
    {
      dayId: 2,
      dayName: 'DOMINGO',
      bibleStudy: 'Tomando caminos distintos',
      title: '🌞 DOMINGO - El cielo se goza',
      story: '¡El Salvador había nacido! Todo el cielo se regocijó. Una gran multitud de ángeles se reunió sobre las colinas de Belén. En los campos, pastores humildes cuidaban ovejas y estaban consagrados a Dios. De repente, los ángeles iluminaron el cielo nocturno y cantaron alabando a Dios por el Salvador recién nacido.',
      think: '¿Por qué Dios les anunció a los pastores y no a los dirigentes? ¿Cómo puedes dedicarle tiempo a Dios hoy?',
      prayer: 'Túrnense en familia para alabar a Dios por todas las cosas que Jesús significa.'
    },
    {
      dayId: 3,
      dayName: 'LUNES',
      bibleStudy: 'La promesa de Dios',
      title: '🌞 LUNES - Adoración de los pastores',
      story: 'Los ángeles desaparecerieron. Asombrados y llenos de alegría, corrieron a Belén. Abrieron la puerta del establo. Allí estaba el niño, envuelto en paño blanco, acostado en un pesebre. Entraron de puntillas, se arrodillaron e inclinaron para adorar al pequeño Jesús. Le brillaban los ojos de felicidad.',
      think: 'Si hubieras visitado al niño Jesús, ¿cómo lo habrías adorado? ¿Qué habrías hecho para ayudar a María y José?',
      prayer: 'Canta una oración para alabar a Dios, como los ángeles.'
    },
    {
      dayId: 4,
      dayName: 'MARTES',
      bibleStudy: 'Abraham encuentra a los ángeles',
      title: '🌞 MARTES - La dedicación del bebé',
      story: 'El niño Jesús cumplió cuarenta días. Llegó el momento de dedicarlo en el templo de Jerusalén. José no podía comprar un cordero, así que preparó dos palomas. La pequeña familia emprendió el viaje de ocho kilómetros hasta Jerusalén. María abrazaba al niño Jesús. José sonrió a su pequeño bebé.',
      think: '¿Qué historias bíblicas te han contado tus padres? ¿Cómo te habrías sentido si Jesús te hubiera cargado en sus brazos?',
      prayer: 'Agradece a Jesús por cuidar de los niños, sobre todo, por cuidarte a ti.'
    },
    {
      dayId: 5,
      dayName: 'MIÉRCOLES',
      bibleStudy: 'Las ciudades malvadas',
      title: '🌞 MIÉRCOLES - Alabanzas en el templo',
      story: 'Simeón caminó rápidamente hacia el templo. Había sentido que el Espíritu Santo le decía que fuera en ese momento. Oraba mientras caminaba. Era justo y devoto. Entonces los ojos de Simeón los vieron. ¡Lo vio a él! Corrió hacia María y José, tomó al niño Jesús en sus brazos y alabó a Dios. ¡El Salvador! ¡Por fin había llegado el Mesías!',
      think: '¿Cómo reconocieron Simeón y Ana quién era el niño Jesús? ¿Qué significa "una luz para revelar a las naciones"?',
      todo: 'Escribe lo que habrías dicho para alabar a Dios por Jesús si hubieras estado en el templo.',
      prayer: 'Convierte los cantos que creaste en oraciones.'
    },
    {
      dayId: 6,
      dayName: 'JUEVES',
      bibleStudy: 'Dios destruye Sodoma',
      title: '🌞 JUEVES - Los sabios de Oriente',
      story: 'Los hombres sonrieron contemplando las estrellas brillantes. Les encantaba estudiar las estrellas y los rollos de la Biblia. Aprendieron del verdadero Dios y las profecías. Una noche vieron una estrella especialmente brillante. Dios les dijo que la siguieran, pues los llevaría al Salvador prometido. Siguieron la estrella durante la noche hasta que llegaron a Jerusalén.',
      think: '¿Cómo supieron los sabios del Mesías? ¿Cuán dedicado eres para aprender más de Dios?',
      todo: 'Prepara y envuelve galletas con forma de estrella para regalo u otros refrigerios saludables.',
      prayer: 'Que Dios te ayude a dedicar tiempo a aprender más de él.'
    },
    {
      dayId: 7,
      dayName: 'VIERNES',
      bibleStudy: 'Nació Isaac',
      title: '🌞 VIERNES - Regalos espléndidos',
      story: 'Cuando oscureció el cielo, los sabios salieron de Jerusalén. La estrella de Dios brillaba sobre ellos. Siguieron hasta Belén, hasta la casa donde el niño Jesús dormía. Se arrodillaron y lo adoraron con amor y devoción. Le entregaron su corazón. Le dieron oro porque Jesús era un rey, incienso porque sería sacerdote, y mirra porque moriría para salvar a su pueblo.',
      think: '¿Qué otro regalo le dieron a Jesús los sabios? ¿Cómo puedes demostrar tu aprecio por Jesús?',
      share: 'Imagina que eres uno de los sabios de Oriente. Cuando oscurezca, busca la estrella más brillante del cielo.',
      journal: 'Menciona a las personas de la historia que alabaron a Dios. ¿Qué idea descubriste sobre la devoción?',
      prayer: 'Formen un círculo familiar imaginando que rodean al niño Jesús. Cada uno termine esta frase: "Querido Dios, estoy agradecido de que Jesús haya venido para..."'
    }
  ],

  // === SEMANA 4 - Cuidar al niño Jesús ===
  '4': [
    {
      dayId: 1,
      dayName: 'SÁBADO',
      bibleStudy: 'Dios prueba a Abraham',
      bibleBase: 'Mateo 2:12-18',
      verse: 'Te guiaré por el mejor sendero para tu vida; te aconsejaré y velaré por ti (Salmo 32:8)',
      word: 'Guía - Dar consejos e información para ayudar a resolver un problema. La guía nos conduce y encamina.',
      message: 'Dios puede guiar mi vida.'
    },
    {
      dayId: 2,
      dayName: 'DOMINGO',
      bibleStudy: 'Isaac y Rebeca',
      title: '🌞 DOMINGO - Un corazón corrompido',
      story: 'El rey Herodes recorría los pasillos de su palacio. La visita de los sabios lo había dejado de muy mal humor. Herodes ocultaba odio y envidia detrás de sus amables palabras. Les dijo a los sabios: "Vayan a Belén y busquen al niño. Cuando lo encuentren, vuelvan y díganme dónde está para que yo también vaya y lo adore". Pero todo era una mentira. En lugar de adorar, Herodes planeaba matar al niño Jesús.',
      think: '¿Por qué Herodes odiaba tan profundamente? ¿Cómo te proteges del mal?',
      prayer: 'Pídele a Dios que te ayude a reconocer el mal y a protegerte.'
    },
    {
      dayId: 3,
      dayName: 'LUNES',
      bibleStudy: 'Jacob y Esaú',
      title: '🌞 LUNES - Guiados a Egipto',
      story: 'La noche estaba oscura. José abrió los ojos y se despertó. Estaba seguro de lo que tenía que hacer. En un instante despertó a María. Juntos cargaron el burrito. Esa noche en silencio se apresuraron. Dios podía ver que su precioso Hijo corría terrible peligro. Satanás estaba decidido a destruir a Jesús antes de que pudiera crecer y cumplir su misión.',
      think: '¿Cómo demostró José su confianza en Dios? ¿Qué haces cuando un camino parece difícil?',
      prayer: 'Pídele a Dios que te acompañe en cada camino que recorras.'
    },
    {
      dayId: 4,
      dayName: 'MARTES',
      bibleStudy: 'El sueño de Jacob',
      title: '🌞 MARTES - ¡Vámonos rápido!',
      story: 'José y María viajaban a Egipto obedeciendo al ángel. Confiaban en que Dios los acompañaría. Aunque el viaje era largo y peligroso, sabían que Dios los protegería. La pequeña familia dejó atrás su hogar y se dirigieron hacia Egipto, donde estarían seguros del malvado rey Herodes.',
      think: 'Piensa en un familiar que te haya guiado. Conecta con ellos esta semana de forma creativa.',
      prayer: 'Agradece a Dios por aquellos que te ayudan a conocer a Jesús.'
    },
    {
      dayId: 5,
      dayName: 'MIÉRCOLES',
      bibleStudy: 'Engañado en su matrimonio',
      title: '🌞 MIÉRCOLES - Regresar a casa',
      story: 'José se acostó tranquilamente. Una sonrisa iluminaba sus labios. La vida era buena en Egipto. El pequeño Jesús crecía bien. Su familia estaba a salvo. Entonces Dios le dio un sueño. El ángel le dijo que Herodes había muerto y que podían regresar a su tierra.',
      think: '¿Cómo se habría sentido José al poder regresar a casa? ¿Qué significa para ti "hogar"?',
      prayer: 'Pídele a Dios que te guíe por el camino correcto.'
    },
    {
      dayId: 6,
      dayName: 'JUEVES',
      bibleStudy: 'Caminos separados',
      title: '🌞 JUEVES - El nacimiento del Rey',
      story: 'Dentro del pequeño establo, una lámpara brillaba con luz suave y cálida. José y María contemplaban al bebé con asombro. ¡Era el Hijo de Dios! La paz y la alegría llenaron el corazón de María. Pronunció suavemente el nombre de su bebé: "Jesús". Un nombre tan hermoso, tan lleno de significado.',
      todo: 'Escribe o haz un anuncio del nacimiento del bebé Jesús.',
      prayer: 'Agradece a Jesús porque vino a mostrarte cuánto te ama.'
    },
    {
      dayId: 7,
      dayName: 'VIERNES',
      bibleStudy: 'Jacob lucha con Dios',
      title: '🌞 VIERNES - El amor de Dios',
      story: 'Jesús cayó agotado por la batalla con Satanás. Al verlo, Dios hizo algo maravilloso. Envió ángeles con comida para recordarle a Jesús el gran amor de Dios. Durante todo este tiempo, Dios vela por nosotros y nos guía a través de la vida.',
      share: 'Escribe citas bíblicas en papelitos y escóndelos. Hablen sobre cómo Dios nos guía a través de su Palabra.',
      journal: '¿Qué aprendiste sobre cómo Dios guía nuestras vidas? ¿Cuándo sentiste que Dios te guió?',
      prayer: 'Agradezcan juntos a Dios por guiar sus caminos y proteger sus vidas.'
    }
  ],

  // === SEMANA 5 - En Nazaret ===
  '5': [
    {
      dayId: 1,
      dayName: 'SÁBADO',
      bibleStudy: 'Jacob vuelve a Betel',
      bibleBase: 'Lucas 2:40-52',
      verse: 'Y Jesús crecía en sabiduría y en estatura, y en el favor de Dios y de toda la gente. (Lucas 2:52)',
      word: 'Obediente - Cumplir las instrucciones o mandatos de alguien.',
      message: 'Jesús es mi amigo.'
    },
    {
      dayId: 2,
      dayName: 'DOMINGO',
      bibleStudy: 'Los sueños de José',
      title: '🌞 DOMINGO - Digno de un rey',
      story: 'Una suave brisa soplaba sobre las verdes colinas que rodeaban Nazaret. Las ovejas balaban bajo la sombra. Los pájaros cantaban con alegría. Alejada de los caminos principales, Nazaret era un lugar tranquilo. Jesús y su familia podían sentirse en casa. A medida que Jesús crecía, Dios lo mantuvo cerca de su familia y de la naturaleza.',
      think: '¿Cómo era la casa donde vivía Jesús? ¿Qué aprendes de cómo Jesús vivió?',
      prayer: 'Personaliza tu oración para el niño que se registra en tu Escuela Sabática.'
    },
    {
      dayId: 3,
      dayName: 'LUNES',
      bibleStudy: 'Hermano en venta',
      title: '🌞 LUNES - Un trabajador dispuesto',
      story: 'Lavar los platos, hacer las camas, barrer el piso del taller de carpintería de José. Jesús veía lo que había que hacer y lo hacía. María y José sonreían al ver cómo su hijo se convertía en un trabajador dispuesto y feliz. Estas hermosas cualidades hacían que fuera un placer tener a Jesús en casa. Siempre pensando en los demás.',
      think: '¿Qué trabajos hacía Jesús en la casa? ¿Qué trabajos haces tú en casa?',
      prayer: 'Pídele a Jesús que te ayude a ser un trabajador dispuesto en tu casa.'
    },
    {
      dayId: 4,
      dayName: 'MARTES',
      bibleStudy: 'La esposa de Potifar',
      title: '🌞 MARTES - Enseñaba a los maestros',
      story: 'Las campanas en la túnica blanca del sumo sacerdote tintineaban. Jesús crecía en sabiduría y en estatura, en el favor de Dios y de toda la gente. Sus respuestas a los maestros del templo demostraron su conocimiento de las Escrituras.',
      think: '¿Por qué un niño de doce años sorprendería a los maestros? ¿Qué significa crecer en sabiduría?',
      prayer: 'Pídele a Dios que te ayude a crecer en sabiduría.'
    },
    {
      dayId: 5,
      dayName: 'MIÉRCOLES',
      bibleStudy: 'El copero y el panadero',
      title: '🌞 MIÉRCOLES - La aventura de la Pascua',
      story: 'Cada año, la familia de Jesús iba a Jerusalén para celebrar la Pascua. Esta era una festividad importante para los judíos. La familia viajaba con muchas otras personas de su pueblo.',
      think: '¿Qué era la Pascua? ¿Por qué era importante para los judíos?',
      prayer: 'Agradece a Dios por las festividades que celebras con tu familia.'
    },
    {
      dayId: 6,
      dayName: 'JUEVES',
      bibleStudy: 'Los sueños del faraón',
      title: '🌞 JUEVES - Perdido y encontrado',
      story: 'Las celebraciones de la Pascua habían terminado. Multitudes de viajeros se dirigían a los caminos polvorientos. Jesús no estaba con ellos. Se había quedado en la casa de su Padre Dios, deseoso de seguir hablando con los rabinos. Tres días después, sus padres lo encontraron en el templo, enseñando a los maestros.',
      think: '¿Cómo se sintieron María y José al no encontrar a Jesús? ¿Cómo se habrían sentido al descubrir dónde estaba?',
      todo: 'Haz un corazón con elementos naturales para regalo a tus papás.',
      prayer: 'Pídele a Dios que siempre esté en tu corazón.'
    },
    {
      dayId: 7,
      dayName: 'VIERNES',
      bibleStudy: 'La interpretación del sueño',
      title: '🌞 VIERNES - Una vida tranquila',
      story: 'Después de este evento, Jesús regresó a Nazaret. Continuó viviendo una vida tranquila con María y José. Trabajaba en el taller de carpintería. Ayudaba en la casa. Crecía en sabiduría y madurez. Dios estaba preparando a Jesús para su futuro ministerio.',
      journal: '¿Qué aprendiste esta semana sobre la vida de Jesús en Nazaret? ¿Cómo te gustaría vivir como Jesús?',
      prayer: 'Agradece a Dios por guiar la vida de Jesús y también la tuya.'
    }
  ],

  // === SEMANA 6 - En el río Jordán ===
  '6': [
    {
      dayId: 1,
      dayName: 'SÁBADO',
      bibleStudy: 'Un liderazgo con sabiduría',
      bibleBase: 'Mateo 3:1-17',
      verse: 'Y una voz del cielo dijo: "Este es mi Hijo muy amado, quien me da gran gozo". (Mateo 3:17)',
      word: 'Preparado - Listo, dispuesto para algo.',
      message: 'Dios prepara el corazón para recibir a Jesús.'
    },
    {
      dayId: 2,
      dayName: 'DOMINGO',
      bibleStudy: 'Sus hermanos compran alimentos',
      title: '🌞 DOMINGO - Un bebé pequeño, una gran tarea',
      story: 'Mientras Jesús iba creciendo, otro niño especial también crecía. Elisabet abrazó al pequeño Juan meditando en las palabras del ángel. "Hará que muchos israelitas vuelvan al Señor su Dios". A este bebé le esperaba una tarea muy importante.',
      think: '¿Cuál era la tarea especial de Juan? ¿Qué tarea especial tiene Dios para ti?',
      prayer: 'Pídele a Dios que te muestre tu propósito en la vida.'
    },
    {
      dayId: 3,
      dayName: 'LUNES',
      bibleStudy: 'El hermano perdido',
      title: '🌞 LUNES - Aprender y prepararse',
      story: 'El desierto era un lugar solitario. Colinas áridas y cuevas rocosas. No había casas, ni horno limpio, ni pueblo cercano. Aun así, ese era el hogar de Juan. Él estaba contento. Dios lo preparaba para una misión especial. Juan aprendía a confiar en Dios y a seguir sus mandatos.',
      think: '¿Por qué Juan vivía en el desierto? ¿Cómo nos prepara Dios para nuestras tareas?',
      prayer: 'Pídele a Dios que te prepare para lo que te tiene reservado.'
    },
    {
      dayId: 4,
      dayName: 'MARTES',
      bibleStudy: 'Jacob llega a Egipto',
      title: '🌞 MARTES - Predicar para preparar corazones',
      story: 'La voz de Juan resonó en el desierto: "Arrepiéntanse de sus pecados y vuelvan a Dios, porque el reino del cielo está cerca". Con palabras poderosas, una voz fuerte y el poder del Espíritu Santo, Juan exhortaba al pueblo a cambiar. ¡El Mesías está por venir!',
      think: '¿Qué mensaje predicaba Juan? ¿Cómo ayudaba a preparar a la gente para Jesús?',
      prayer: 'Pídele a Dios que prepare tu corazón para recibir a Jesús.'
    },
    {
      dayId: 5,
      dayName: 'MIÉRCOLES',
      bibleStudy: 'La muerte de Jacob',
      title: '🌞 MIÉRCOLES - El entusiasmo se extiende',
      story: 'El sol del mediodía brillaba sobre el río Jordán. Más y más personas venían a ser bautizadas. El entusiasmo se extendía. Muchos querían ser bautizados por Juan. Algunos pensaban que era un profeta de la antigüedad que había resucitado.',
      think: '¿Por qué tanta gente quería ser bautizada por Juan? ¿Qué significa el bautismo?',
      prayer: 'Agradece a Dios por el bautismo y lo que significa.'
    },
    {
      dayId: 6,
      dayName: 'JUEVES',
      bibleStudy: '¡Esclavitud!',
      title: '🌞 JUEVES - Jesús es bautizado',
      story: 'Entonces Jesús llegó al río Jordán. Juan lo vio. "¡Miren! ¡Ahí está el Cordero de Dios!" Jesús pidió ser bautizado. Juan se sintió indigno. Pero Jesús dijo: "Así debe hacerse, porque tenemos que cumplir con todo lo que Dios exige". Cuando Jesús fue bautizado, se abrieron los cielos. El Espíritu Santo descendió como una paloma. Una voz del cielo dijo: "Este es mi Hijo muy amado, quien me da gran gozo".',
      todo: 'Dibuja una paloma y escribe el versículo: "(Tu nombre) eres mi hijo amado y me das gran gozo"',
      prayer: 'Agradece a Dios por el bautismo de Jesús.'
    },
    {
      dayId: 7,
      dayName: 'VIERNES',
      bibleStudy: 'Un bebé entre las aguas',
      title: '🌞 VIERNES - Preparados y listos',
      story: 'Juan había preparado el camino para Jesús. Los corazones de muchas personas habían sido preparados para recibir al Mesías. Ahora Jesús estaba listo para comenzar su ministerio. Dios prepara a las personas de muchas maneras diferentes para estar listas para recibir a Jesús.',
      journal: '¿Cómo preparó Dios a Juan para su tarea? ¿Cómo te está preparando Dios a ti?',
      prayer: 'Agradece a Dios porque está preparando tu corazón para Jesús.'
    }
  ],

  // === SEMANA 7 - Victoria en el desierto ===
  '7': [
    {
      dayId: 1,
      dayName: 'SÁBADO',
      bibleStudy: 'La zarza ardiente',
      bibleBase: 'Mateo 4:1-11',
      verse: 'Adora al Señor tu Dios y sírvele solamente a él. (Mateo 4:10)',
      word: 'Confianza - Creer y confiar en alguien o algo completamente.',
      message: 'Puedo confiar en Dios y su poder.'
    },
    {
      dayId: 2,
      dayName: 'DOMINGO',
      bibleStudy: '¡Moisés ante el faraón!',
      title: '🌞 DOMINGO - En el desierto',
      story: 'Jesús sonrió alejándose del río Jordán. Las bellas palabras de Dios resonaban: "Este es mi Hijo muy amado". Confiando en la Palabra de Dios, subió al desierto árido. ¿Por qué fue Jesús allí? Para estar a solas con Dios y prepararse para su ministerio especial.',
      think: '¿Por qué Jesús fue al desierto? ¿Cómo te preparas tú para enfrentar desafíos?',
      prayer: 'Pídele a Dios que te prepare para los desafíos de la vida.'
    },
    {
      dayId: 3,
      dayName: 'LUNES',
      bibleStudy: 'Las plagas',
      title: '🌞 LUNES - El bien contra el mal',
      story: 'Satanás había estado observando a Jesús. Después de cuarenta días, Jesús estaba cansado, débil y con hambre. Satanás vio su oportunidad. Dios había dicho: "Este es mi Hijo muy amado". Satanás decidió usar esas palabras para tentar a Jesús. Primero le dijo: "Si eres el Hijo de Dios, convierte estas piedras en pan".',
      think: '¿Cuáles fueron las tres tentaciones de Satanás? ¿Cómo resistió Jesús?',
      prayer: 'Pídele a Dios que te ayude a resistir las tentaciones.'
    },
    {
      dayId: 4,
      dayName: 'MARTES',
      bibleStudy: 'La Pascua',
      title: '🌞 MARTES - Cansado y con hambre',
      story: 'Después de cuarenta días en el desierto, Jesús estaba débil. Satanás intentó tentarlo diciendo: "Si tienes hambre, por qué no conviertes estas piedras en pan? Si realmente eres el Hijo de Dios, demuéstralo". Pero Jesús respondió: "Está escrito: No solo de pan vive el hombre, sino de toda palabra que procede de la boca de Dios".',
      think: '¿Por qué rechazó Jesús convertir las piedras en pan? ¿Qué aprendes de esta respuesta?',
      prayer: 'Agradece a Jesús porque confió en Dios.'
    },
    {
      dayId: 5,
      dayName: 'MIÉRCOLES',
      bibleStudy: 'Los israelitas salen de Egipto',
      title: '🌞 MIÉRCOLES - ¡Tírate!',
      story: 'Satanás llevó a Jesús a la cima del templo. "Si eres el Hijo de Dios, tírate de aquí. Los ángeles te atraparán. Está escrito: Los ángeles cuidarán de ti". Pero Jesús respondió: "También está escrito: No tentarás al Señor tu Dios". Jesús sabía que no debía poner a prueba el poder de Dios.',
      think: '¿Qué significaba "tentar a Dios"? ¿Por qué Jesús rechazó esta tentación?',
      prayer: 'Pídele a Dios sabiduría para no tentar su poder.'
    },
    {
      dayId: 6,
      dayName: 'JUEVES',
      bibleStudy: 'El milagro en el Mar Rojo',
      title: '🌞 JUEVES - Poder y riqueza',
      story: 'Satanás llevó a Jesús a una montaña muy alta. Le mostró todos los reinos del mundo y su esplendor. "Te daré todo esto si te arrodillas y me adoras". Pero Jesús rechazó esta tentación diciendo: "Vete, Satanás. Está escrito: Adora al Señor tu Dios y sírvele solamente a él".',
      think: '¿Por qué era tentadora esta oferta? ¿Qué valor tiene el dinero y el poder?',
      prayer: 'Pídele a Dios que te ayude a valorar lo importante en la vida.'
    },
    {
      dayId: 7,
      dayName: 'VIERNES',
      bibleStudy: '¡Ahogados en el mar!',
      title: '🌞 VIERNES - El amor de Dios',
      story: 'Jesús cayó al suelo, agotado por la batalla con Satanás. Al verlo, Dios hizo algo maravilloso. Envió ángeles con comida para recordarle a Jesús el gran amor de Dios. Jesús había vencido todas las tentaciones. Había confiado en Dios y en su Palabra. Ahora estaba listo para comenzar su ministerio de enseñar, sanar y salvar.',
      journal: '¿Cómo venció Jesús las tentaciones? ¿Cómo puedes resistir las tentaciones en tu vida?',
      prayer: 'Agradece a Dios porque Jesús confió en él y venció.'
    }
  ],

  // === SEMANA 8 - Llamados a seguir a Jesús ===
  '8': [
    {
      dayId: 1,
      dayName: 'SÁBADO',
      bibleStudy: 'El alimento en el desierto',
      bibleBase: 'Juan 1:35-51',
      verse: 'Síganme, y los haré pescadores de hombres. (Marcos 1:17)',
      word: 'Seguidor - Aquel que sigue a otra persona, que la imita y obecece.',
      message: 'Jesús me ama tanto que me invita a seguirlo.'
    },
    {
      dayId: 2,
      dayName: 'DOMINGO',
      bibleStudy: 'Los Diez Mandamientos',
      title: '🌞 DOMINGO - Dos pescadores',
      story: 'Jesús bajó por el camino rocoso del desierto. Confiando en la Palabra de Dios, había vencido las tentaciones. Después de que los ángeles lo alimentaron, se dirigió de nuevo al río Jordán. Al día siguiente, Juan el Bautista vio a Jesús. Una sonrisa iluminó su rostro: "¡Miren! ¡Ahí está el Cordero de Dios!"',
      think: '¿Quiénes eran Andrés y Juan? ¿Por qué siguieron a Jesús?',
      prayer: 'Pídele a Jesús que te ayude a seguirlo cada día.'
    },
    {
      dayId: 3,
      dayName: 'LUNES',
      bibleStudy: 'El tabernáculo',
      title: '🌞 LUNES - ¡Hemos encontrado al Mesías!',
      story: 'Dos pescadores, Andrés y Juan, oyeron las palabras de Juan. Se preguntaban qué significaba "el Cordero de Dios". Anhelaban descubrirlo, así que siguieron a Jesús. Al oír los pasos detrás de él, Jesús se volvió: "¿Qué quieren?" Ellos le preguntaron dónde vivía. Jesús les dijo: "Vengan y vean". Se quedaron con Jesús ese día.',
      think: '¿Qué aprendieron Andrés y Juan al pasar el día con Jesús? ¿Cómo cambió sus vidas?',
      prayer: 'Agradece a Jesús por invitarte a pasar tiempo con él.'
    },
    {
      dayId: 4,
      dayName: 'MARTES',
      bibleStudy: 'El becerro de oro',
      title: '🌞 MARTES - ¡Sígueme!',
      story: 'Mientras Jesús avanzaba hacia Galilea, vio a Felipe: "Sígueme". Y Felipe lo siguió, así de simple. Pero no sin antes correr a llamar a su amigo Natanael. Le dijo: "¡Hemos encontrado a aquel de quien Moisés y los profetas escribieron! Se llama Jesús, hijo de José, de Nazaret".',
      think: '¿Cómo dejó Felipe su vida anterior para seguir a Jesús? ¿Qué harías tú si Jesús te dijera "sígueme"?',
      todo: 'Prende una linterna en la oscuridad para que un miembro de tu familia te siga.',
      prayer: 'Pídele a Jesús que te guíe como la luz en la oscuridad.'
    },
    {
      dayId: 5,
      dayName: 'MIÉRCOLES',
      bibleStudy: 'La gloria de Dios',
      title: '🌞 MIÉRCOLES - Simón se convierte en Pedro',
      story: 'Andrés llevó a su hermano Simón a Jesús. Cuando Jesús lo vio, le dijo: "Tú eres Simón, hijo de Jonás. De ahora en adelante te llamarás Cefas" (que significa Pedro, piedra). Este sería uno de sus discípulos más cercanos.',
      think: '¿Por qué Jesús le cambió el nombre? ¿Qué significó este cambio?',
      prayer: 'Agradece a Dios porque Jesús te conoce por tu nombre.'
    },
    {
      dayId: 6,
      dayName: 'JUEVES',
      bibleStudy: 'El Día de la Expiación',
      title: '🌞 JUEVES - Natanael cree',
      story: 'Natanael estaba bajo una higuera orando cuando Felipe le dio la buena noticia. Al principio, Natanael dudaba: "¿De Nazaret puede salir algo bueno?" Pero cuando Jesús le dijo que lo había visto bajo la higuera, Natanael creyó. "Rabí, ¡tú eres el Hijo de Dios! ¡Tú eres el Rey de Israel!"',
      think: '¿Por qué Natanael dudaba al principio? ¿Qué lo convenció de que Jesús era el Mesías?',
      prayer: 'Pídele a Jesús que aumente tu fe en él.'
    },
    {
      dayId: 7,
      dayName: 'VIERNES',
      bibleStudy: 'Las quejas del pueblo',
      title: '🌞 VIERNES - Discípulos',
      story: 'Jesús había utilizado el lenguaje de los pescadores cuando llamó a Pedro, Andrés y Juan. "Síganme, y los haré pescadores de hombres". En lugar de pescar peces, "pescarían personas" y las ayudarían a conocer a Jesús. Jesús sabía que necesitaría amigos especiales que lo ayudaran con su misión.',
      journal: '¿Qué significa ser un "pescador de hombres"? ¿Cómo puedes ayudar a otros a conocer a Jesús?',
      prayer: 'Pídele a Jesús que te ayude a ser su discípulo y a traer a otros a él.'
    }
  ],

  // === SEMANA 9 - ¡Se agotó el jugo de uva! ===
  '9': [
    {
      dayId: 1,
      dayName: 'SÁBADO',
      bibleStudy: 'Los doce espías',
      bibleBase: 'Juan 2:1-11',
      verse: 'Esta, la primera de sus señales, la hizo Jesús en Caná de Galilea. Así reveló su gloria, y sus discípulos creyeron en él. (Juan 2:11)',
      word: 'Fe - Creer completamente en Dios y en sus promesas.',
      message: 'A Jesús le agrada sorprenderme con cosas buenas para que crezca mi fe.'
    },
    {
      dayId: 2,
      dayName: 'DOMINGO',
      bibleStudy: '¡La rebelión!',
      title: '🌞 DOMINGO - El primer milagro',
      story: 'Una boda era un evento importante en los tiempos bíblicos. Duraba varios días. Toda la familia se reunía para celebrar. María, la madre de Jesús, estaba en una boda en Caná de Galilea. Jesús y sus discípulos también fueron invitados. Fue un honor especial tener a Jesús en la celebración.',
      think: '¿Por qué era importante una boda en los tiempos bíblicos? ¿Cómo celebra tu familia los eventos importantes?',
      prayer: 'Agradece a Dios por los momentos especiales de celebración.'
    },
    {
      dayId: 3,
      dayName: 'LUNES',
      bibleStudy: 'Dios da agua de una roca',
      title: '🌞 LUNES - Un problema importante',
      story: 'Durante la fiesta, se agotó el vino. Este era un problema grave. Significaría una vergüenza para la familia de los novios. María se dio cuenta del problema y fue a Jesús. "No tienen vino", le dijo. Jesús respondió: "Querida mujer, ¿por qué me involucras? Mi tiempo aún no ha llegado". Pero María confió en Jesús.',
      think: '¿Por qué fue María a Jesús con este problema? ¿Cómo sabía que él podía ayudar?',
      prayer: 'Pídele a Jesús ayuda con tus problemas.'
    },
    {
      dayId: 4,
      dayName: 'MARTES',
      bibleStudy: 'La serpiente de bronce',
      title: '🌞 MARTES - Seis tinajas de agua',
      story: 'Jesús pidió que trajeran seis tinajas grandes de piedra. Estas tinajas se usaban para las ceremonias de purificación de los judíos. Jesús dijo a los sirvientes: "Llenen las tinajas de agua". Los sirvientes llenaron las tinajas hasta el borde. Luego Jesús dijo: "Ahora saquen un poco y llévenlo al maestresala de la fiesta".',
      think: '¿Por qué Jesús pidió que llenaran tinajas de agua? ¿Qué estaba a punto de suceder?',
      prayer: 'Agradece a Jesús porque puede hacer lo imposible.'
    },
    {
      dayId: 5,
      dayName: 'MIÉRCOLES',
      bibleStudy: 'El ángel y el asna de Balaam',
      title: '🌞 MIÉRCOLES - ¡Un milagro!',
      story: 'Cuando el maestresala probó el agua convertida en vino, quedó asombrado. No sabía de dónde había salido. Pero los sirvientes que habían llenado las tinajas lo sabían. Era el mejor vino que se había probado en toda la fiesta. ¡Jesús había hecho un milagro asombroso!',
      think: '¿Por qué crees que Jesús hizo este milagro? ¿Qué demuestra este milagro sobre el poder de Jesús?',
      prayer: 'Pídele a Jesús que te sorprenda con su poder.'
    },
    {
      dayId: 6,
      dayName: 'JUEVES',
      bibleStudy: 'Tiempos de cambio',
      title: '🌞 JUEVES - La fe en Jesús',
      story: 'Este fue el primer milagro público de Jesús. Mostró su gloria. Sus discípulos creyeron en él. Vieron que Jesús era verdaderamente el Hijo de Dios. Tenía poder para hacer lo imposible. Podía cambiar agua en vino. ¿Qué más podría hacer? Su fe en Jesús se fortaleció.',
      think: '¿Cómo fortaleció tu fe este milagro en los discípulos? ¿Qué hace para fortalecer tu fe en Jesús?',
      prayer: 'Pídele a Jesús que fortalezca tu fe cada día.'
    },
    {
      dayId: 7,
      dayName: 'VIERNES',
      bibleStudy: 'Elección de la vida',
      title: '🌞 VIERNES - Sorpresas buenas',
      story: 'Jesús ama sorprendernos con cosas buenas. Sus sorpresas están diseñadas para hacer crecer nuestra fe. Cuando vemos el poder de Dios en nuestras vidas, nuestro amor y confianza en él aumentan. Jesús quiere que experimentemos su amor y su poder en formas nuevas cada día.',
      journal: '¿Cuál fue la sorpresa más grande que Jesús te ha dado? ¿Cómo te hizo crecer en fe?',
      prayer: 'Agradece a Jesús por sus sorpresas y por el crecimiento de tu fe.'
    }
  ],

  // === SEMANA 10 - Jesús alimenta a la multitud ===
  '10': [
    {
      dayId: 1,
      dayName: 'SÁBADO',
      bibleStudy: 'Josué, el nuevo líder',
      bibleBase: 'Mateo 14:15-21',
      verse: 'No tienen que irse. ¡Denles algo de comer! (Mateo 14:16)',
      word: 'Abundancia - Gran cantidad de algo más que suficiente.',
      message: 'Jesús se preocupa por mis necesidades.'
    },
    {
      dayId: 2,
      dayName: 'DOMINGO',
      bibleStudy: 'Moisés contempla la Tierra Prometida',
      title: '🌞 DOMINGO - Grandes multitudes',
      story: 'Grandes multitudes seguían a Jesús. Querían verlo sanar a los enfermos y escuchar sus enseñanzas. Fue un día largo, y toda la multitud, miles de personas, estaba cansada y hambrienta. Los discípulos se acercaron a Jesús: "Es tarde. Envía a la multitud a sus casas para que puedan comer". Pero Jesús les dijo: "No tienen que irse. ¡Denles algo de comer!"',
      think: '¿Cómo se sentirían miles de personas hambrientas? ¿Cómo se preocupaba Jesús por el bienestar de la gente?',
      prayer: 'Agradece a Jesús por preocuparse por tus necesidades.'
    },
    {
      dayId: 3,
      dayName: 'LUNES',
      bibleStudy: 'Los espías',
      title: '🌞 LUNES - ¿Cómo alimentar a tanta gente?',
      story: 'Los discípulos estaban sorprendidos. "¿Nosotros? ¿Cómo podemos alimentar a toda esta gente? No tenemos ni siquiera pan. ¿Dónde conseguiríamos comida suficiente para miles de personas?" Jesús les preguntó: "¿Cuánto pan tienen?" Los discípulos buscaron. Solo encontraron cinco panes pequeños y dos pescaditos.',
      think: '¿Parecía imposible alimentar a miles de personas con tan poco? ¿Cómo te sientes cuando enfrentas un problema grande?',
      prayer: 'Pídele a Jesús ayuda para tus problemas imposibles.'
    },
    {
      dayId: 4,
      dayName: 'MARTES',
      bibleStudy: 'Cruzando el río',
      title: '🌞 MARTES - Un pequeño niño ofrece su almuerzo',
      story: 'Entonces, un pequeño niño se acercó con su almuerzo. Él tenía cinco panes pequeños y dos pescaditos. Sin dudarlo, ofreció todo lo que tenía a Jesús. El pequeño no pensó en sí mismo. Pensó en ayudar a Jesús. Su acto de generosidad fue hermoso.',
      think: '¿Por qué el pequeño niño ofreció su almuerzo? ¿Cómo te inspira su generosidad?',
      todo: 'Comparte algo que tengas con alguien necesitado esta semana.',
      prayer: 'Pídele a Dios un corazón generoso como el del pequeño niño.'
    },
    {
      dayId: 5,
      dayName: 'MIÉRCOLES',
      bibleStudy: 'La conquista de Jericó',
      title: '🌞 MIÉRCOLES - El milagro de la multiplicación',
      story: 'Jesús tomó los cinco panes y los dos pescaditos. Dio gracias a Dios. Los partió y los distribuyó entre sus discípulos. Los discípulos los distribuyeron entre la multitud. ¡Todos comieron y quedaron satisfechos! De hecho, sobró comida. Fueron recolectados doce canastos llenos de sobras. ¡Fue un milagro asombroso!',
      think: '¿Cómo multiplicó Jesús el pan? ¿Por qué hizo este milagro?',
      prayer: 'Agradece a Jesús por su poder y su cuidado.'
    },
    {
      dayId: 6,
      dayName: 'JUEVES',
      bibleStudy: 'Manteniendo la promesa',
      title: '🌞 JUEVES - La abundancia de Dios',
      story: 'No solo alimentó a la multitud, sino que sobró comida. Esto muestra la abundancia de Dios. Dios no solo nos da lo que necesitamos, sino más que suficiente. Su provisión es generosa y abundante. Podemos confiar en que Dios cuidará de nosotros.',
      think: '¿Qué demuestra el hecho de que sobrara comida? ¿Cómo te sientes sabiendo que Dios cuida de ti abundantemente?',
      prayer: 'Agradece a Dios por su abundancia en tu vida.'
    },
    {
      dayId: 7,
      dayName: 'VIERNES',
      bibleStudy: 'Débora y Barac',
      title: '🌞 VIERNES - Confianza en Jesús',
      story: 'Este milagro demuestra el cuidado y el poder de Jesús. Él se preocupa por nuestras necesidades físicas y espirituales. No es solo un maestro que enseña desde lejos. Es un amigo que se preocupa por nosotros. Podemos confiar en que él nos cuidará.',
      journal: '¿Cómo cuida Jesús de ti? ¿En qué necesitas confiar más en él?',
      prayer: 'Pídele a Jesús que aumentes tu confianza en su cuidado.'
    }
  ],

  // === SEMANA 11 - Discípulos en formación ===
  '11': [
    {
      dayId: 1,
      dayName: 'SÁBADO',
      bibleStudy: 'Gedeón',
      bibleBase: 'Marcos 3:13-19',
      verse: 'Subió Jesús a una montaña y llamó a los que quiso, y ellos se reunieron con él. (Marcos 3:13)',
      word: 'Discípulo - Alumno que sigue a un maestro y aprende de él.',
      message: 'Puedo ser un discípulo de Jesús.'
    },
    {
      dayId: 2,
      dayName: 'DOMINGO',
      bibleStudy: 'Gedeón y sus trescientos guerreros',
      title: '🌞 DOMINGO - Los doce apóstoles',
      story: 'Jesús subió a una montaña y llamó a los discípulos que él quería. Doce hombres respondieron al llamado de Jesús para ser sus apóstoles. Los apóstoles eran sus discípulos especiales, sus amigos cercanos que lo acompañarían dondequiera que fuera.',
      think: '¿Quiénes eran los doce apóstoles? ¿Por qué los eligió Jesús?',
      prayer: 'Agradece a Jesús por elegir a hombres que lo siguieron.'
    },
    {
      dayId: 3,
      dayName: 'LUNES',
      bibleStudy: 'La promesa de Jefté',
      title: '🌞 LUNES - Profesiones diversas',
      story: 'Los apóstoles provenían de diferentes ocupaciones. Algunos eran pescadores: Pedro, Andrés, Santiago y Juan. Others tenían diferentes profesiones. Mateo era cobrador de impuestos. Simón era zealota. Pero todos ellos dejaron sus trabajos y sus vidas para seguir a Jesús. Su compromiso fue total.',
      think: '¿Qué dejaron los apóstoles para seguir a Jesús? ¿Qué dejarías tú por Jesús?',
      prayer: 'Pídele a Jesús que te ayude a dejar todo por seguirlo.'
    },
    {
      dayId: 4,
      dayName: 'MARTES',
      bibleStudy: 'El poderoso Sansón',
      title: '🌞 MARTES - Aprendiendo juntos',
      story: 'A medida que pasaban tiempo con Jesús, los apóstoles aprendían de él. Escuchaban sus enseñanzas. Lo veían hacer milagros. Aprendían a amar a Dios y a los demás. Jesús los entrenaba para una misión especial. Los preparaba para predicar el Evangelio después de su resurrección.',
      think: '¿Qué aprendieron los apóstoles de Jesús? ¿Qué quieres aprender de Jesús?',
      prayer: 'Pídele a Jesús que te enseñe sus caminos.'
    },
    {
      dayId: 5,
      dayName: 'MIÉRCOLES',
      bibleStudy: 'Sansón y Dalila',
      title: '🌞 MIÉRCOLES - Milagros y signos',
      story: 'Los discípulos vieron a Jesús sanar enfermedades, echar demonios, calmar las tempestades y resucitar a los muertos. Vieron su poder sobre la naturaleza y sobre el mal. Cada milagro fortalecía su fe y su confianza en él.',
      think: '¿Cuáles fueron algunos de los milagros que Jesús hizo? ¿Cómo afectaron esto a los discípulos?',
      prayer: 'Pídele a Jesús que hagas milagros en tu vida.'
    },
    {
      dayId: 6,
      dayName: 'JUEVES',
      bibleStudy: 'La lealtad de Rut',
      title: '🌞 JUEVES - Predicadores del Evangelio',
      story: 'Después de la resurrección de Jesús, los apóstoles se convirtieron en los primeros predicadores del Evangelio. Llevaron las buenas noticias de Jesús a todo el mundo. Predicaron en Jerusalén, en Judea, en Samaria y hasta los confines de la tierra. Su dedicación cambió el mundo.',
      think: '¿Qué pasó con los apóstoles después de la resurrección? ¿Cómo continuaron su trabajo?',
      prayer: 'Agradece a Dios por los apóstoles y su dedicación.'
    },
    {
      dayId: 7,
      dayName: 'VIERNES',
      bibleStudy: 'Dios oyó la oración de Ana',
      title: '🌞 VIERNES - Tú también puedes ser discípulo',
      story: 'Nosotros también podemos ser discípulos de Jesús. No necesitamos ser apóstoles del primer siglo. Podemos aprender de Jesús leyendo la Biblia, orando, y en nuestra iglesia. Podemos seguir su ejemplo en nuestras vidas diarias. Podemos compartir el Evangelio con otros. Jesús nos invita a ser sus discípulos hoy.',
      think: '¿Cómo puedes ser un discípulo de Jesús? ¿Qué significa ser discípulo en tu vida?',
      share: 'Hablen en familia sobre cómo ser discípulos de Jesús. ¿Qué promesas harás a Jesús?',
      journal: '¿Qué aprendiste este trimestre sobre Jesús? ¿Cómo ha cambiado tu relación con él?',
      prayer: 'Compromete tu vida a Jesús. Pídele que te ayude a ser su discípulo fiel todos los días. Agradécele por amarte y por invitarte a seguirlo.'
    }
  ]
}

export function getDayContent(weekId, dayId) {
  return DAILY_CONTENT[String(weekId)]?.[dayId - 1] || null
}

export function getDayKey(weekId, dayId) {
  return `w${weekId}d${dayId}`
}
