"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha");
const config_1 = __importDefault(require("../src/config"));
const index_1 = __importDefault(require("../src/datasource/index"));
chai_1.default.use(chai_http_1.default);
(0, mocha_1.describe)('Movies', function () {
    let sequelize;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            sequelize = yield index_1.default.getInstance();
            sequelize.options.logging = false;
            yield sequelize.sync({ force: true, match: /_test$/ });
        });
    });
    afterEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield sequelize.close();
        });
    });
    const url = config_1.default.apiUrl || 'http://localhost:3000/v1';
    const data = {
        title: 'The Murderer',
        genre: 'Action',
        description: 'After a series of deaths in a small provincial town.',
        duration: '120m',
    };
    (0, mocha_1.describe)('[POST] Create Movie', () => __awaiter(this, void 0, void 0, function* () {
        (0, mocha_1.it)('should create a new movie', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const expectedProperties = ['movieId', 'title', 'genre', 'description', 'duration', 'photo', 'links'];
                const res = yield chai_1.default.request(url).post('/movies').send(data);
                (0, chai_1.expect)(res.status).to.equal(201);
                (0, chai_1.expect)(res.body).to.include.keys(...expectedProperties);
                (0, chai_1.expect)(res.body).to.haveOwnProperty('links');
                (0, chai_1.expect)(res.body.links[0]).to.include.keys('rel', 'href', 'action', 'types');
            });
        });
        (0, mocha_1.it)('should return conflict error', function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    chai_1.default.request(url).post('/movies').send(data);
                }
                catch (error) {
                    console.log(error);
                    (0, chai_1.expect)(error.status).to.equal(409);
                }
            });
        });
    }));
    let movieId;
    (0, mocha_1.describe)('[GET] Get movies', () => __awaiter(this, void 0, void 0, function* () {
        (0, mocha_1.it)('should get movies', () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const res = yield chai_1.default.request(url).get('/movies');
            (0, chai_1.expect)(res.status).to.be.equal(200);
            (0, chai_1.expect)(res.body).to.haveOwnProperty('metadata');
            (0, chai_1.expect)(res.body).to.haveOwnProperty('data');
            (0, chai_1.expect)(res.body.data).to.be.an('array');
            movieId = (_a = res.body.data[0]) === null || _a === void 0 ? void 0 : _a.movieId;
        }));
    }));
    (0, mocha_1.describe)('[GET] Get movie', () => __awaiter(this, void 0, void 0, function* () {
        (0, mocha_1.it)('should get a movie', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield chai_1.default.request(url).get(`/movies/${movieId}`);
            (0, chai_1.expect)(res.status).to.be.equal(200);
            (0, chai_1.expect)(res.body.movieId).to.be.equal(movieId);
            (0, chai_1.expect)(res.body.genre).to.be.equal('Action');
        }));
        (0, mocha_1.it)('should return null ', () => __awaiter(this, void 0, void 0, function* () {
            const res = yield chai_1.default.request(url).get('/movies/avsbdhhdryurjjw');
            (0, chai_1.expect)(res.status).to.be.equal(500);
            (0, chai_1.expect)(res.body.name).to.be.equal('SequelizeDatabaseError');
            (0, chai_1.expect)(res.body.error).to.be.equal('invalid input syntax for type uuid: "avsbdhhdryurjjw"');
        }));
    }));
});
//# sourceMappingURL=movies.test.js.map