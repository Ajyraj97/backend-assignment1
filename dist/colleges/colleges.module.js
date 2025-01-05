"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollegesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const colleges_controller_1 = require("./colleges.controller");
const colleges_service_1 = require("./colleges.service");
const college_entity_1 = require("./entities/college.entity");
const college_placement_entity_1 = require("./entities/college-placement.entity");
const college_course_entity_1 = require("./entities/college-course.entity");
const city_entity_1 = require("./entities/city.entity");
const state_entity_1 = require("./entities/state.entity");
let CollegesModule = class CollegesModule {
};
exports.CollegesModule = CollegesModule;
exports.CollegesModule = CollegesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([college_entity_1.College, college_placement_entity_1.CollegePlacement, college_course_entity_1.CollegeCourse, city_entity_1.City, state_entity_1.State]),
        ],
        controllers: [colleges_controller_1.CollegesController],
        providers: [colleges_service_1.CollegesService],
    })
], CollegesModule);
//# sourceMappingURL=colleges.module.js.map