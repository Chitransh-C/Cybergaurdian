import { courseService } from './course.service.js';
import asyncHandler from '../../shared/middleware/async.handler.js';

export class CourseController {
  static getAll = asyncHandler(async (req, res) => {
    const courses = await courseService.getAllCourses();
    return res.json({
      success: true,
      courses
    });
  });

  static getById = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const course = await courseService.getCourseDetails(courseId);
    return res.json({
      success: true,
      course
    });
  });
}

export default CourseController;
