"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Supports ES6
var venom_bot_1 = require("venom-bot");
//const venom = require('venom-bot');
var NlpManager = require("node-nlp").NlpManager;
var manager = new NlpManager({ languages: ["pt"], forceNER: true });
// Adds the utterances and intents for the NLP
manager.addDocument("pt", "oi", "saudacao");
manager.addDocument("pt", "tudo bem", "saudacao");
manager.addDocument("pt", "boa tarde", "saudacao");
manager.addDocument("pt", "boa noite", "saudacao");
manager.addDocument("pt", "bom dia", "saudacao");
manager.addDocument("pt", "e ae", "saudacao");
manager.addDocument("pt", "tudo bem?", "preocupacao");
manager.addDocument("pt", "como vc ta?", "preocupacao");
manager.addDocument("pt", "ta tudo bem com voce?", "preocupacao");
manager.addDocument("pt", "como foi seu dia?", "preocupacao");
manager.addDocument("pt", "onde fica localizada", "localizacao");
manager.addDocument("pt", "onde fica localizada", "localizacao");
manager.addDocument("pt", "qual o ponto de referencia", "localizacao");
manager.addDocument("pt", "qual o endereço", "localizacao");
manager.addDocument("pt", "qual a localizacao da empresa", "localizacao");
// Train also the NLG
manager.addAnswer("pt", "saudacao", "Oii Tudo bem?");
manager.addAnswer("pt", "saudacao", "Oiie Bom dia");
manager.addAnswer("pt", "saudacao", "Bom dia");
manager.addAnswer("pt", "saudacao", "Oiie Boa tarde");
manager.addAnswer("pt", "saudacao", "Boa tarde");
manager.addAnswer("pt", "saudacao", "Oiie Boa noite");
manager.addAnswer("pt", "saudacao", "Boa noite");
manager.addAnswer("pt", "saudacao", "Oiie como vc tá?");
manager.addAnswer("pt", "saudacao", "Oie Tudo bom?");
manager.addAnswer("pt", "saudacao", "Oii tá tudo bem com vc?");
manager.addAnswer("pt", "preocupacao", "Estou bem e vc?");
manager.addAnswer("pt", "preocupacao", "Tudo bem comigo e com vc?");
manager.addAnswer("pt", "preocupacao", "Sim, estou muito bem graças a Deus");
manager.addAnswer("pt", "preocupacao", "Foi bem");
manager.addAnswer("pt", "preocupacao", "Foi bom");
manager.addAnswer("pt", "preocupacao", "Meu dia foi legal");
manager.addAnswer("pt", "preocupacao", "Meu dia foi cansativo");
manager.addAnswer("pt", "localizacao", "Blz, vou te mandar a localizacao no mapa!");
// Função Main
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, manager.train()];
            case 1:
                _a.sent();
                manager.save();
                (0, venom_bot_1.create)("BOT")
                    .then(function (client) {
                    //Evento
                    client.onMessage(function (message) { return __awaiter(void 0, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(message.isGroupMsg === false)) return [3 /*break*/, 6];
                                    return [4 /*yield*/, manager.process("pt", message.body)];
                                case 1:
                                    response = _a.sent();
                                    if (!(response.intent === "None")) return [3 /*break*/, 3];
                                    return [4 /*yield*/, client.sendText(message.from, "Ahhh isso eu não vou saber dizer")];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, client.sendText(message.from, response.answer)];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5:
                                    console.log("A intenção do Cliente é :", response.intent + " e o score é  de ", response.score, " e o sentimento é de ", response.sentiment.type);
                                    _a.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                })
                    .catch(function (erro) {
                    console.log(erro);
                });
                return [2 /*return*/];
        }
    });
}); })();
