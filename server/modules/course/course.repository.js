import pool from '../../database/connection.js';

/**
 * Course Repository
 * Encapsulates Course and Module SQL queries.
 */
export class CourseRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM courses ORDER BY created_at ASC');
    return rows.map(c => ({
      ...c,
      skills: typeof c.skills === 'string' ? JSON.parse(c.skills) : c.skills
    }));
  }

  async findById(courseId) {
    const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [courseId]);
    if (rows.length === 0) return null;

    const course = rows[0];
    const [modules] = await pool.query(
      'SELECT * FROM modules WHERE course_id = ? ORDER BY module_number ASC',
      [courseId]
    );

    const formattedModules = modules.map(m => ({
      ...m,
      commandReference: typeof m.command_reference === 'string' ? JSON.parse(m.command_reference) : m.command_reference,
      tasks: typeof m.tasks === 'string' ? JSON.parse(m.tasks) : m.tasks
    }));

    return {
      ...course,
      skills: typeof course.skills === 'string' ? JSON.parse(course.skills) : course.skills,
      modules: formattedModules
    };
  }
}

export const courseRepository = new CourseRepository();
export default courseRepository;
