/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Library extends Component {

  constructor(props) {
    super(props);
    this.state = {
      last_read: '',
      Books: 
        [{
          title: 'Game of Thrones',
          summary: "It's like musical chairs but with dragons",
          author: 'George R. R. Martin',
          cover: 'https://images-na.ssl-images-amazon.com/images/I/51DA1hQNnJL._SX324_BO1,204,203,200_.jpg',
          en: ["Game of Thrones", "We should start back, Gared urged as the woods began to grow dark around them.", "The wildlings are dead.", "Do the dead frighten you?", "Ser Waymar Royce asked with just the hint of a smile.", "Gared did not rise to the bait.", "He was an old man, past fifty, and he had seen the lordlings come and go.", "Dead is dead, he said.", "We have no business with the dead.", "Are they dead?", "Royce asked softly.", "What proof have we?", "Will saw them, Gared said.", "If he says they are dead, that’s proof enough for me.", "Will had known they would drag him into the quarrel sooner or later.", "He wished it had been later rather than sooner.", "My mother told me that dead men sing no songs, he put in.", "My wet nurse said the same thing, Will, Royce replied.", "Never believe anything you hear at a woman’s tit.", "There are things to be learned even from the dead.", "His voice echoed, too loud in the twilit forest.", "We have a long ride before us,” Gared pointed out.", "Eight days, maybe nine. And night is falling.", "Ser Waymar Royce glanced at the sky with disinterest.", "It does that every day about this time.", "Are you unmanned by the dark, Gared?", "Will could see the tightness around Gared’s mouth, the barely suppressed anger in his eyes under the thick black hood of his cloak.", "Gared had spent forty years in the Night’s Watch, man and boy, and he was not accustomed to being made light of.", "Yet it was more than that.", "Under the wounded pride, Will could sense something else in the older man.", "You could taste it; a nervous tension that came perilous close to fear.", "Will shared his unease.", "He had been four years on the Wall.", "The first time he had been sent beyond, all the old stories had come rushing back, and his bowels had turned to water.", "He had laughed about it afterward.", "He was a veteran of a hundred rangings by now, and the endless dark wilderness that the southron called the haunted forest had no more terrors for him.", "Until tonight.", "Something was different tonight.", "There was an edge to this darkness that made his hackles rise.", "Nine days they had been riding, north and northwest and then north again, farther and farther from the Wall, hard on the track of a band of wildling raiders.", "Each day had been worse than the day that had come before it.", "Today was the worst of all.", "A cold wind was blowing out of the north, and it made the trees rustle like living things.", "All day, Will had felt as though something were watching him, something cold and implacable that loved him not.", 'Gared had felt it too.', "Will wanted nothing so much as to ride hellbent for the safety of the Wall, but that was not a feeling to share with your commander.", "Especially not a commander like this one.", "Ser Waymar Royce was the youngest son of an ancient house with too many heirs.", "He was a handsome youth of eighteen, grey-eyed and graceful and slender as a knife.", "Mounted on his huge black destrier, the knight towered above Will and Gared on their smaller garrons.", "He wore black leather boots, black woolen pants, black moleskin gloves, and a fine supple coat of gleaming black ringmail over layers of black wool and boiled leather.", "Ser Waymar had been a Sworn Brother of the Night’s Watch for less than half a year, but no one could say he had not prepared for his vocation.", "At least insofar as his wardrobe was concerned.", "His cloak was his crowning glory; sable, thick and black and soft as sin.", "'Bet he killed them all himself, he did,' Gared told the barracks over wine, 'twisted their little heads off, our mighty warrior.'", "They had all shared the laugh.", "It is hard to take orders from a man you laughed at in your cups, Will reflected as he sat shivering atop his garron.", "Gared must have felt the same.", "'Mormont said as we should track them, and we did,' Gared said.", "They’re dead.", "They shan’t trouble us no more.", "There’s hard riding before us.", "I don’t like this weather.", "If it snows, we could be a fortnight getting back, and snow’s the best we can hope for.", "Ever seen an ice storm, my lord?", "The lordling seemed not to hear him.", "He studied the deepening twilight in that half- bored, half-distracted way he had.", "Will had ridden with the knight long enough to understand that it was best not to interrupt him when he looked like that.", "Tell me again what you saw, Will.", "All the details.", "Leave nothing out.", "Will had been a hunter before he joined the Night’s Watch.", "Well, a poacher in truth.", "The End.", "For now."],
          esp: ["Juego de Tronos", "Deberíamos empezar de nuevo, insistió Gared cuando el bosque comenzó a oscurecerse alrededor de ellos", "Los salvajes están muertos", "¿Los muertos te asustan?", "Ser Waymar Royce preguntó con el toque de una sonrisa.","Gared no se acercó al cebo.", "Era un hombre mayor, tenía más de cincuenta años, y había visto a los señores ir y venir.", "Muerto está muerto, dijo.", "No tenemos ningún negocio. con los muertos.", "¿Están muertos?", "Royce preguntó en voz baja.", "¿Qué pruebas tenemos?", "Will los vio, dijo Gared.","Si él dice que están muertos, eso es prueba suficiente para yo","Will sabía que lo arrastrarían a la pelea tarde o temprano","Deseaba que hubiera sido más tarde que pronto", "Mi madre me dijo que los hombres muertos no cantan canciones, agregó.", "Mi nodriza dijo lo mismo, Will, respondió Royce.","Nunca creas nada de lo que escuchas con la teta de una mujer", "Hay cosas que aprender incluso de los muertos", "Su voz hizo eco, demasiado fuerte en el bosque crepuscular", "'Tenemos un largo camino por delante', Señaló Gared.", "Ocho días, tal vez nueve, y la noche está cayendo", "Ser Waymar Royce miró al cielo con desinterés.", "Hace eso todos los días a esta hora.", "¿No eres tripulado por la oscuridad, Gared?", "Will pudo ver la tensión alrededor de la boca de Gared, la ira apenas contenida en sus ojos bajo la gruesa capucha negra de su capa", "Gared había pasado cuarenta años en la Guardia de la Noche, hombre y niño, y no estaba acostumbrado a ser ignorado.", "Sin embargo, era más que eso.", "Bajo el orgullo herido, Will podía sentir algo más en el hombre mayor.", "Podías saborearlo; una tensión nerviosa que se acercaba peligrosamente al miedo malestar.", "Will compartió su inquietud.", "Había estado cuatro años en el Muro", "La primera vez que lo enviaron al otro lado, todas las viejas historias habían regresado de prisa y sus entrañas se habían convertido en agua", "Se había reído de eso después", "Ya era un veterano de cien toques, y el desierto oscuro y sin fin que Southron llamó el bosque encantado no tenía más terrores para él.","Hasta esta noche","Algo fue diferente esta noche", "Hubo un borde en esta oscuridad que hizo que se alzaran sus jirones.", "Nueve días habían estado montando, al norte y al noroeste y luego al norte de nuevo, más y más lejos del Muro, duros en la pista de una banda de asaltantes salvajes.", "Cada día había sido peor que el día que había llegado antes de eso","Hoy fue el peor de todos", "Un viento frío soplaba desde el norte, y hacía que los árboles crujieran como seres vivos", "Todo el día, Will sintió como si algo lo estuviera observando, algo frío y implacable que no lo amaba.", "Gared también lo había sentido", "Will no quería nada más que andar en el infierno por la seguridad del Muro, pero ese no era un sentimiento para compartir con tu comandante", "Especialmente no un comandante como éste", "Ser Waymar Royce era el hijo más joven de una casa antigua con demasiados herederos", "Era un joven apuesto de dieciocho años, de ojos grises y elegante y delgado como un cuchillo", "Montado en su enorme corcel negro, el caballero se alzaba por encima de Will y Gared en sus garrones más pequeños", "Llevaba botas de cuero negro, pantalones de lana negros, guantes negros de piel de topo y una capa fina y brillante de brillante anillo negro sobre capas de negro lana y cuero hervido.", "Ser Waymar había sido un hermano jurado de la Guardia de la Noche por menos de medio año, pero nadie podía decirlo, no se había preparado para su vocación.", "Al menos en lo que respecta a su vestuario","Su manto fue su gloria suprema; sable, espeso, negro y suave como el pecado.", "'Apuesto a que él los mató a todos él mismo, lo hizo', dijo Gared a los barracones sobre de vino, 'se retorció la cabeza, nuestro poderoso guerrero'","Todos compartieron la risa", "Es difícil recibir órdenes de un hombre del que te reíste en tus tazas, Will reflexionó mientras se sentaba temblando encima de su garrón", "Gared debe haber sentido lo mismo.", "Mormont dijo que deberíamos rastrearlos, y lo hicimos', dijo Gared.","Ellos están muertos", "No nos molestarán más", "Hay una conducción difícil ante nosotros.", "No me gusta este clima.", "Si nieva, podríamos ser una quincena para volver, y la nieve es lo mejor que podemos esperar", "¿Alguna vez has visto una tormenta de hielo, mi señor?", "El señor no pareció escucharlo", "Estudió la profunda penumbra de esa manera medio aburrida, medio distraída que había tenido", "Will había cabalgado con el caballero el tiempo suficiente para comprender que era mejor no interrumpirlo cuando se veía así.", "Dime otra vez lo que viste, Will","Todos los detalles", "No dejar nada afuera", "Will había sido un cazador antes de unirse a la Guardia de la Noche", "Bueno, un cazador furtivo en verdad", "El fin.", "Por ahora."],
          _id: 1,
        },
        {
          title: 'Charlie & the Chocolate Factory',
          author: 'Roald Dahl',
          summary: 'A psychopath fulfills his pediophilic cravings by hosting tours of his candy factory to children.',
          cover: 'http://prodimage.images-bn.com/pimages/9780142410318_p0_v4_s1200x630.jpg',
          en: ["Charlie & the Chocolate Factory", 'Here Comes Charlie These two very old people are the father and mother of Mr Bucket.', 'Their names are Grandpa Joe and Grandma Josephine.', 'And these two very old people are the father and mother of Mrs Bucket.', 'Their names are Grandpa George and Grandma Georgina.', 'This is Mr Bucket.', 'This is Mrs Bucket.', 'Mr and Mrs Bucket have a small boy whose name is Charlie.', 'This is Charlie.', "How d'you do?", "And how d'you do?", "And how d'you do again?", 'He is pleased to meet you.', 'The whole of this family — the six grown-ups(count them) and little Charlie Bucket — live together in a small wooden house on the edge of a great town.', "The house wasn't nearlylarge enough for so many people, and life was extremely uncomfortable for them all.", 'There were only two rooms in the place altogether, and there was only one bed.', 'The bed was given to the four old grandparents because they were so old and tired.', 'They were so tired, they never got out of it.', 'Grandpa Joe and Grandma Josephine on this side, Grandpa George and Grandma Georgina on this side.', 'Mr and Mrs Bucket and little Charlie Bucket slept in the other room, upon mattresses on the floor.', "In the summertime, this wasn't too bad, but in the winter, freezing cold draughts blew across the floor all night long, and it was awful.", "There wasn't any question of them being able to buy a better house — or even one more bed to sleep in.", 'They were far too poor for that.', 'Mr Bucket was the only person in the family with a job.', 'He worked in a toothpaste factory, where he sat all day long at a bench and screwed the little caps on to the tops of the tubes of toothpaste after the tubes had been filled.', 'But a toothpaste cap-screwer is never paid very muchmoney, and poor Mr Bucket, however hard he worked, and however fast he screwed on the caps, was never able to make enough to buy one half of the things that so large a family needed.', "There wasn't even enough money to buy proper food for them all.", "The only meals they could afford were bread and margarine for breakfast, boiled potatoes and cabbage for lunch, and cabbage soup for supper.", "Sundays were a bit better.", "They all looked forward to Sundays because then, although they had exactly the same, everyone was allowed a second helping.", "The Buckets, of course, didn't starve, but every one of them — the two old grandfathers, the two old grandmothers, Charlie's father, Charlie's mother, and especially little Charlie himself — went about from morning till night with a horrible empty feelingin their tummies.", 'Charlie felt it worst of all.', "And although his father and mother often went without their own share of lunch or supper so that they could give it to him, it still wasn't nearly enough for a growing boy.", "He desperately wanted something more filling and satisfying than cabbage and cabbage soup.', 'The one thing he longed for more than anything else was...", "CHOCOLATE.", "Walking to school in the mornings, Charlie could see great slabs of chocolate piled up high in the shop windows, and he would stopand stare and press his nose against the glass, his mouth watering like mad.", "Many times a day, he would see other children taking bars of creamy chocolate out of their pockets and munching them greedily, and that, of course, was pure torture.","Only once a year, on his birthday, did Charlie Bucket ever get to taste a bit of chocolate.", "The whole family saved up their money for that special occasion, and when the great day arrived, Charlie was always presented with one small chocolate bar to eat all by himself.", "And each time he received it, on those marvellous birthday mornings, he would place it carefully in a small wooden box that he owned, and treasure itas though it were a bar of solid gold; and for the next few days, he would allow himself only to look at it, but never to touch it.", "Then at last, when he could stand it no longer, he would peel back a tiny bit of the paper wrapping at one corner to expose a tiny bitof chocolate, and then he would take a tiny nibble — just enough to allow the lovely sweet taste to spread out slowly over his tongue.", "The next day, he would take another tiny nibble, and so on, and so on.", "And in this way, Charlie would make his sixpenny bar of birthday chocolate last him for more than a month.", "But I haven't yet told you about the one awful thing that tortured little Charlie,the lover of chocolate, more than anything else.", "This thing, for him, was far, far worse than seeing slabs of chocolate in the shopwindows or watching other children munching bars of creamy chocolate right in front of him.", "It was the most terrible torturing thing you could imagine, and it was this: In the town itself, actually within sight of the house in which Charlie lived, there was an ENORMOUS CHOCOLATE FACTORY!", "Just imagine that!", "And it wasn't simply an ordinary enormous chocolate factory, either.", "It was the largest and most famous in the whole world!", "It was WONKA'S FACTORY, owned by a man called Mr Willy Wonka, the greatest inventor and maker of chocolates that there has ever been.", "And what a tremendous, marvellous place it was!", "It had huge iron gates leading into it, and a high wall surrounding it, and smoke belching from its chimneys, and strange whizzing sounds coming from deep inside it.", "And outside the walls, for half a mile around in every direction, the air was scented with the heavy rich smell of melting chocolate!", "Twice a day, on his way to and from school, little Charlie Bucket had to walk right past the gates of the factory.", "And every time he went by, he would begin to walk very, very slowly, and he would hold his nose high in the air and take long deep sniffs of the gorgeous chocolatey smell all around him.", "Oh, how he loved that smell!", "And oh, how he wished he could go inside the factory and see what itwas like!", "The end.", "For now."],
          esp: ["Charlie y la Fábrica de Chocolate", "Aquí viene Charlie, estos dos ancianos son el padre y la madre del señor Bucket", "Sus nombres son el abuelo Joe y la abuela Josephine", "Y estos dos ancianos son el padre y la madre de la señora Bucket", "Sus nombres son el abuelo George y la abuela Georgina", "Este es el señor Bucket", "Esta es la señora Bucket", "El señor y la señora Bucket tienen un niño pequeño que se llama Charlie", "Este es Charlie", "¿Cómo te va?", "¿Y cómo te va?", "¿Y cómo lo haces otra vez?", "Se complace en conocerte", "Toda esta familia: la seis adultos (cuéntelos) y el pequeño Charlie Bucket - viven juntos en una pequeña casa de madera en el borde de una gran ciudad", "La casa no era lo suficientemente grande para tanta gente, y la vida era extremadamente incómoda para todos.", " Había solo dos habitaciones en el lugar en total, y solo había una cama.", " La cama fue entregada a los cuatro abuelos porque estaban muy viejos y cansados.", " Estaban tan cansados ​​que nunca salieron de eso.", "El abuelo Joe y la gran dama Josephine en este lado, el abuelo George y la abuela Georgina en este lado.", "El señor y la señora Bucket y el pequeño Charlie Bucket dormían en la otra habitación, en colchones en el piso.", "En el verano Esto no fue tan malo, pero en el invierno, las corrientes de aire frío congelaron el piso durante toda la noche, y fue horrible", "No había ninguna duda de que pudieran comprar una casa mejor, o incluso una más para dormir.", "Eran demasiado pobres para eso.", "El Sr. Bucket era la única persona de la familia que tenía trabajo", "trabajé en una fábrica de pasta de dientes, donde me senté todo el día en un banco y Enrosque las pequeñas tapas en la parte superior de los tubos de pasta de dientes después de que se hayan llenado los tubos.", "Pero a un destornillador de pasta de dientes nunca se le paga mucho dinero, y el pobre Sr. Bucket, por mucho que haya trabajado, y por muy rápido que haya atornillado a los Gorros, nunca pudo ganar lo suficiente para comprar la mitad de las cosas que necesitaban para comprar una familia numerosa.", "No había suficiente dinero para comprar comida adecuada para todos.", "Las únicas comidas que podían pagar eran pan y margarina para el desayuno, papas hervidas y repollo para el almuerzo, y sopa de repollo para la cena.", "Los domingos fueron un poco mejor", "Todos esperaban los domingos porque entonces, aunque tenían exactamente lo mismo, a todos se les permitía una segunda ayuda", "Los Buckets, por supuesto, no se murieron de hambre, pero todos ellos: los dos abuelos viejos, los dos abuelas viejas, el padre de Charlie, la madre de Charlie, y especialmente el pequeño Charlie, pasaban de la mañana a la noche con una horrible sensación de vacío en sus estómagos", "Charlie sintió que era lo peor de todo .", " Y aunque su padre y su madre a menudo iban sin su propia cuota de almuerzo o cena para que pudieran dárselo, todavía no era suficiente para un niño en crecimiento.", "Deseaba desesperadamente algo más abundante y satisfactorio que la col y la sopa de repollo una cosa que anhelaba más que cualquier otra cosa era..."," CHOCOLATE "," Caminando a la escuela por las mañanas, Charlie podía ver grandes trozos de chocolate apilados en los escaparates de la tienda, se detenía, miraba y presionaba su nariz contra el vidrio, su boca aguada como loca","Muchos Varias veces al día, veía a otros niños sacando barras de chocolate cremoso de los bolsillos y comiéndolos con avidez, y eso, por supuesto, era pura tortura.", "Sólo una vez al año, en su cumpleaños, se le ocurría a Charlie Bucket para probar un poco de chocolate.", "Toda la familia ahorró su dinero para esa ocasión especial, y cuando llegó el gran día, a Charlie siempre se le presentaba una pequeña barra de chocolate para que comiera solo.", "Y cada vez lo recibió, en esas maravillosas mañanas de cumpleaños, lo colocaría cuidadosamente en una pequeña caja de madera que poseía, y lo atesoró como si fuera una barra de oro macizo; y durante los siguientes días, solo se permitiría mirarlo, pero nunca tocarlo.", "Por fin, cuando ya no pudo soportarlo más, retiró un poco el papel que envolvía una esquina para exponer una pequeña cantidad de chocolate, y luego tomaría un pequeño mordisco, lo suficiente para permitir que el encantador sabor dulce se extienda lentamente sobre su lengua", "Al día siguiente, él tomaría otro pequeño mordisco, y así sucesivamente, y así sucesivamente", "Y de esta manera, Charlie haría que su barra de seis peniques de chocolate de cumpleaños le durara por más de un mes", "aún no te he contado sobre la única cosa horrible que torturó al pequeño Charlie, el amante del chocolate, más que a cualquier otra cosa", "Para él, esta cosa era mucho, mucho peor que ver losas de chocolate en los escaparates o mirar otros niños comiendo barras de chocolate cremoso justo delante de él.", "Fue la cosa más terrible que te puedes imaginar, y era esto: en la ciudad, a la vista de la casa en la que vivía Charlie, había ¡UNA FÁBRICA DE CHOCOLATE ENORME!", "¡Imagínate eso!", "Y tampoco era simplemente una enorme fábrica de chocolate común y corriente", "¡Fue la más grande y famosa de todo el mundo!", "Fue la FÁBRICA DE WONKA, propiedad de un hombre llamado el Sr. Willy Wonka, el mejor inventor y fabricante de chocolates que haya existido", "¡Era un lugar maravilloso!", "Tenía enormes puertas de hierro que lo conducían, y una pared alta que lo rodeaba, y humo saliendo de sus chimeneas, y extraños sonidos provenientes de su interior.", "Y fuera de las paredes, ¡por media milla en todas direcciones, el aire estaba perfumado con el fuerte olor del chocolate derretido!", "Dos veces al día, en su camino hacia y desde la escuela, el pequeño Charlie Bucket tuvo que pasar por las puertas de la fábrica.", "Y cada vez que pasaba, comenzaba a caminar muy, muy lentamente, y mantenía su nariz en alto en el aire y tomaba largos y profundos olfateados del magnífico aroma a chocolate que lo rodeaba", "Oh, ¡Cómo amaba ese olor!", "Y oh, ¡cómo deseaba poder entrar a la fábrica y ver cómo era!", "El fin.", "Por ahora."],
          _id: 2
        }]
      }

      this.getData = this.getData.bind(this);
      this.storeData = this.getData.bind(this);
    }
  static navigationOptions = {
    title: 'Library',
  };

  componentWillMount(){
    this.getData().then((last_read) => this.setState({last_read}))
  }

  getData = async () => {
    try {
      return await AsyncStorage.getItem('last_read')
    } catch(e) {
      // error reading value
    }
  }

  
  storeData = async (book) => {
    try {
      await AsyncStorage.setItem('last_read', book.title)
    } catch (e) {
      // saving error
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    
    function BookTile(props) {
      
      var book = props.book

      
      return (
        <TouchableWithoutFeedback onPress={() => {
            navigate('Reading', {book: book})
          }}>
          <View style={styles.bookContainer}>
            <Image style={{width: 50, height: 80, marginTop: 10, marginRight: 10}} source={{uri: book.cover}}/>
            <View style={styles.bookTile}>
              <Text style={styles.bookTileText}>{book.title}</Text>
              <Text style={styles.bookTileSummary}>{book.author}</Text>
              <Text style={styles.bookTileSummary}>{book.summary}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    }

    function BookList(props) {
      const listBooks = props.books.map((book) =>
        // Correct! Key should be specified inside the array.
        <BookTile book={book} />
    
      )
      return (
          <ScrollView style={styles.container}>
            {listBooks}
          </ScrollView>
      );
    }


    return (
      <React.Fragment>
        <Text>{this.state.last_read}</Text>
        <BookList books={this.state.Books}/>
      </React.Fragment>
      
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FEFBF7',
    padding: 10,
  },
  bookContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FEFBF7',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },

  bookTileText: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookTileSummary: {
    color: 'grey',
    fontSize: 12,
    paddingTop: 5,
    width: 300
  },
  bookTile: {
    height: 100,
    margin: 1,
    paddingBottom: 15,
    paddingTop: 15,
    
  },
});


  // <TouchableWithoutFeedback onPress={() => navigate('Reading', {bookTitle: 'blaaaaah'})}>
  //   < View style={{width: 325, height: 100, margin: 20, backgroundColor: 'blue'}}>
  //     <Text>Go Read</Text>
  //   </View>
  // </TouchableWithoutFeedback>