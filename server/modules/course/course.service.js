import { courseRepository } from './course.repository.js';
import { NotFoundError } from '../../shared/errors/domain.errors.js';

export class CourseService {
  constructor(courseRepo = courseRepository) {
    this.courseRepo = courseRepo;
  }

  async getAllCourses() {
    return this.courseRepo.findAll();
  }

  async getCourseDetails(courseId) {
    const course = await this.courseRepo.findById(courseId);
    if (!course) {
      throw new NotFoundError('Curriculum Course', courseId);
    }
    return course;
  }
}

export const courseService = new CourseService();
export default courseService;
