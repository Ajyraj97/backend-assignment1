import { CollegesService } from './colleges.service';
export declare class CollegesController {
    private readonly collegesService;
    constructor(collegesService: CollegesService);
    getCollegeData(id: number): Promise<{
        avgSection: any[];
        placementSection: import("./entities/college-placement.entity").CollegePlacement[];
    }>;
    getCollegeCourses(id: number): Promise<import("./entities/college-course.entity").CollegeCourse[]>;
    filterColleges(city?: string, state?: string): Promise<import("./entities/college.entity").College[]>;
}
