// Supports ES6
import { create, Whatsapp } from "venom-bot";
//const venom = require('venom-bot');
const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["pt"], forceNER: true });
// Adds the utterances and intents for the NLP
manager.addDocument("pt", "oi", "saudacao");
manager.addDocument("pt", "tudo bem", "saudacao");
manager.addDocument("pt", "boa tarde", "saudacao");
manager.addDocument("pt", "boa noite", "saudacao");
manager.addDocument("pt", "bom dia", "saudacao");
manager.addDocument("pt", "e ae", "saudacao");
manager.addDocument("pt", "fala mano", "saudacao");
manager.addDocument("pt", "ei mano", "saudacao");
manager.addDocument("pt", "tudo bem?", "preocupacao");
manager.addDocument("pt", "como vc ta?", "preocupacao");
manager.addDocument("pt", "ta tudo bem com voce?", "preocupacao");
manager.addDocument("pt", "como foi seu dia?", "preocupacao");
manager.addDocument("pt", "oi tudo bem?", "preocupacao");
manager.addDocument("pt", "ei como vc ta?", "preocupacao");
manager.addDocument("pt", "esta tudo bem com voce?", "preocupacao");
manager.addDocument("pt", "como foi hoje?", "preocupacao");
manager.addDocument("pt", "onde fica localizada", "localizacao");
manager.addDocument("pt", "onde fica localizada", "localizacao");
manager.addDocument("pt", "qual o ponto de referencia", "localizacao");
manager.addDocument("pt", "qual o endereço", "localizacao");
manager.addDocument("pt", "qual a localizacao da empresa", "localizacao");
// Train also the NLG
manager.addAnswer(
  "pt",
  "saudacao",
  "Oii Tudo bem?"
);
manager.addAnswer(
  "pt",
  "saudacao",
  "Oiie Bom dia"
);
manager.addAnswer(
  "pt",
  "saudacao",
  "Bom dia"
);
manager.addAnswer(
  "pt",
  "saudacao",
  "Oiie Boa tarde"
);
manager.addAnswer(
  "pt",
  "saudacao",
  "Boa tarde"
);
manager.addAnswer(
  "pt",
  "saudacao",
  "Oiie Boa noite"
);
manager.addAnswer(
  "pt",
  "saudacao",
  "Fala mano"
);
manager.addAnswer(
  "pt",
  "saudacao",
  "Boa noite"
);
manager.addAnswer(
  "pt",
  "saudacao",
  "Oiie como vc tá?"
);
manager.addAnswer(
  "pt",
  "saudacao",
  "Oie Tudo bom?"
);
manager.addAnswer(
  "pt",
  "saudacao",
  "Oii tá tudo bem com vc?"
);
manager.addAnswer(
  "pt",
  "preocupacao",
  "Estou bem e vc?"
);
manager.addAnswer(
  "pt",
  "preocupacao",
  "Tudo bem comigo e com vc?"
);
manager.addAnswer(
  "pt",
  "preocupacao",
  "Sim, estou muito bem graças a Deus"
);
manager.addAnswer(
  "pt",
  "preocupacao",
  "Foi bem"
);
manager.addAnswer(
  "pt",
  "preocupacao",
  "Foi bom"
);
manager.addAnswer(
  "pt",
  "preocupacao",
  "Meu dia foi legal"
);
manager.addAnswer(
  "pt",
  "preocupacao",
  "Meu dia foi cansativo"
);
manager.addAnswer(
  "pt",
  "localizacao",
  "Blz, vou te mandar a localizacao no mapa!"
);
// Função Main
(async () => {
  await manager.train();
  manager.save();
  create("BOT")
    .then((client) => {
      //Evento
      client.onMessage(async (message) => {
        if (message.isGroupMsg === false) {
          const response = await manager.process("pt", message.body.toLowerCase());
          if (response.intent === "None") {
            await client.sendText(
              message.from,
              "Ahhh isso eu não vou saber dizer"
            );
          } else {
            await client.sendText(message.from, response.answer);
          }
          console.log(
            "A intenção do Cliente é :",
            response.intent + " e o score é  de ",
            response.score,
            " e o sentimento é de ",
            response.sentiment.type
          );
        }
      });
    })
    .catch((erro) => {
      console.log(erro);
    });
})();