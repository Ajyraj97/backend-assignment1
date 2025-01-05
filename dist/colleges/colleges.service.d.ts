import { Repository } from 'typeorm';
import { College } from './entities/college.entity';
import { CollegePlacement } from './entities/college-placement.entity';
import { CollegeCourse } from './entities/college-course.entity';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';
export declare class CollegesService {
    private readonly collegeRepo;
    private readonly placementRepo;
    private readonly courseRepo;
    private readonly cityRepo;
    private readonly stateRepo;
    constructor(collegeRepo: Repository<College>, placementRepo: Repository<CollegePlacement>, courseRepo: Repository<CollegeCourse>, cityRepo: Repository<City>, stateRepo: Repository<State>);
    getCollegeData(id: number): Promise<{
        avgSection: any[];
        placementSection: CollegePlacement[];
    }>;
    getCollegeCourses(id: number): Promise<CollegeCourse[]>;
    filterColleges(city?: string, state?: string): Promise<College[]>;
}
