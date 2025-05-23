"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalFileSchema = exports.LocalFile = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let LocalFile = class LocalFile {
    filename;
    mimetype;
    key;
    originalFilename;
    relativePath;
    extension;
};
exports.LocalFile = LocalFile;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LocalFile.prototype, "filename", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LocalFile.prototype, "mimetype", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LocalFile.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LocalFile.prototype, "originalFilename", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LocalFile.prototype, "relativePath", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LocalFile.prototype, "extension", void 0);
exports.LocalFile = LocalFile = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], LocalFile);
exports.LocalFileSchema = mongoose_1.SchemaFactory.createForClass(LocalFile);
//# sourceMappingURL=localFile.schema.js.map