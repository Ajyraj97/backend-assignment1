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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollegesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const college_entity_1 = require("./entities/college.entity");
const college_placement_entity_1 = require("./entities/college-placement.entity");
const college_course_entity_1 = require("./entities/college-course.entity");
const city_entity_1 = require("./entities/city.entity");
const state_entity_1 = require("./entities/state.entity");
let CollegesService = class CollegesService {
    constructor(collegeRepo, placementRepo, courseRepo, cityRepo, stateRepo) {
        this.collegeRepo = collegeRepo;
        this.placementRepo = placementRepo;
        this.courseRepo = courseRepo;
        this.cityRepo = cityRepo;
        this.stateRepo = stateRepo;
    }
    async getCollegeData(id) {
        const avgSection = await this.placementRepo
            .createQueryBuilder('placement')
            .select('placement.year', 'year')
            .addSelect('AVG(placement.highestPlacement)', 'avgHighest')
            .addSelect('AVG(placement.averagePlacement)', 'avgAverage')
            .addSelect('AVG(placement.medianPlacement)', 'avgMedian')
            .addSelect('AVG(placement.placementRate)', 'avgRate')
            .where('placement.collegeId = :collegeId', { collegeId: id })
            .andWhere('placement.highestPlacement > 0')
            .andWhere('placement.averagePlacement > 0')
            .andWhere('placement.medianPlacement > 0')
            .andWhere('placement.placementRate > 0')
            .groupBy('placement.year')
            .getRawMany();
        const placements = await this.placementRepo
            .createQueryBuilder('placement')
            .where('placement.collegeId = :collegeId', { collegeId: id })
            .andWhere('placement.highestPlacement > 0')
            .andWhere('placement.averagePlacement > 0')
            .andWhere('placement.medianPlacement > 0')
            .andWhere('placement.placementRate > 0')
            .orderBy('placement.year', 'DESC')
            .getMany();
        if (placements.length >= 2) {
            const trend = placements[0].placementRate > placements[1].placementRate ? 'UP' : 'DOWN';
            placements[0]['placementTrend'] = trend;
        }
        return { avgSection, placementSection: placements };
    }
    async getCollegeCourses(id) {
        return this.courseRepo.find({
            where: { collegeId: id },
            order: { courseFee: 'DESC' },
        });
    }
    async filterColleges(city, state) {
        if (city) {
            const cityEntity = await this.cityRepo.findOne({ where: { name: city } });
            if (!cityEntity)
                return [];
            return this.collegeRepo.find({ where: { cityId: cityEntity.id } });
        }
        if (state) {
            const stateEntity = await this.stateRepo.findOne({ where: { name: state } });
            if (!stateEntity)
                return [];
            return this.collegeRepo.find({ where: { stateId: stateEntity.id } });
        }
        return this.collegeRepo.find();
    }
};
exports.CollegesService = CollegesService;
exports.CollegesService = CollegesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(college_entity_1.College)),
    __param(1, (0, typeorm_1.InjectRepository)(college_placement_entity_1.CollegePlacement)),
    __param(2, (0, typeorm_1.InjectRepository)(college_course_entity_1.CollegeCourse)),
    __param(3, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __param(4, (0, typeorm_1.InjectRepository)(state_entity_1.State)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CollegesService);
//# sourceMappingURL=colleges.service.js.map