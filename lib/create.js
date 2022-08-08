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
var inquirer = require("inquirer");
var fs = require("fs-extra");
var ice_npm_utils_1 = require("ice-npm-utils");
var generate_project_1 = require("@iceworks/generate-project");
// eslint-disable-next-line
var chalk = require('chalk');
function create(dirPath, templateName, dirname) {
    return __awaiter(this, void 0, void 0, function () {
        var empty, go, isAliInternal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!templateName) return [3 /*break*/, 2];
                    return [4 /*yield*/, selectTemplate()];
                case 1:
                    templateName = _a.sent();
                    _a.label = 2;
                case 2: return [4 /*yield*/, fs.ensureDir(dirPath)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, generate_project_1.checkEmpty(dirPath)];
                case 4:
                    empty = _a.sent();
                    if (!!empty) return [3 /*break*/, 6];
                    return [4 /*yield*/, inquirer.prompt({
                            type: 'confirm',
                            name: 'go',
                            message: 'The existing file in the current directory. Are you sure to continue ？',
                            default: false,
                        })];
                case 5:
                    go = (_a.sent()).go;
                    if (!go)
                        process.exit(1);
                    _a.label = 6;
                case 6: return [4 /*yield*/, generate_project_1.downloadAndGenerateProject(dirPath, templateName)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, ice_npm_utils_1.checkAliInternal()];
                case 8:
                    isAliInternal = _a.sent();
                    console.log();
                    console.log('Initialize project successfully.');
                    console.log();
                    console.log('Starts the development server.');
                    console.log();
                    console.log(chalk.cyan("    cd " + dirname));
                    if (isAliInternal) {
                        console.log(chalk.cyan('    tnpm install'));
                        console.log(chalk.cyan('    tnpm start'));
                        console.log(chalk.cyan('Detected that you are an Alibaba user, DEF plugin has been added!'));
                    }
                    else {
                        console.log(chalk.cyan('    npm install'));
                        console.log(chalk.cyan('    npm start'));
                    }
                    console.log(chalk.cyan('\n\nWe have prepared develop toolkit for you. \nSee: https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks'));
                    console.log();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = create;
/**
 * 选择使用的模板
 *
 * @param {String} type project|material|component
 */
function selectTemplate() {
    return __awaiter(this, void 0, void 0, function () {
        var templates, defaultTemplate, answer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templates = [{
                            npmName: '@alifd/scaffold-simple',
                            description: 'TypeScript + No UI Components',
                        }, {
                            npmName: '@icedesign/ice-antd-scaffold',
                            description: 'TypeScript + Ant Design',
                        }, {
                            npmName: '@alifd/scaffold-lite',
                            description: 'TypeScript + Fusion Design',
                        }, {
                            npmName: '@alifd/fusion-design-pro',
                            description: 'TypeScript + Fusion Design Pro ',
                        }, {
                            npmName: '@alifd/scaffold-lite-js',
                            description: 'JavaScript + Fusion Design',
                        }, {
                            npmName: 'build-plugin-template',
                            description: 'ice.js plugin development template.'
                        }];
                    defaultTemplate = templates[0];
                    return [4 /*yield*/, inquirer.prompt({
                            type: 'list',
                            name: 'template',
                            loop: false,
                            message: 'Please select a template',
                            default: defaultTemplate,
                            choices: templates.map(function (item) {
                                return {
                                    name: item.description,
                                    value: item.npmName,
                                };
                            })
                        })];
                case 1:
                    answer = _a.sent();
                    return [2 /*return*/, answer.template];
            }
        });
    });
}
//# sourceMappingURL=create.js.map