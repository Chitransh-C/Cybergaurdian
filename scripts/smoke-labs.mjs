import { VirtualFileSystem } from '../src/services/vfs.js';
import { ALL_COURSES } from '../src/data/courses.js';

const vfs = new VirtualFileSystem();
let failed = 0;

for (const course of ALL_COURSES) {
  for (const mod of course.modules) {
    if (mod.playground) {
      console.log(`OK playground ${course.id}/${mod.id} -> ${mod.playground}`);
      continue;
    }
    for (const task of mod.tasks) {
      const hint = task.commandHint;
      if (!hint || hint.startsWith('playground:')) {
        console.log(`SKIP ${task.id} (playground only)`);
        continue;
      }
      const res = vfs.execute(hint);
      const event = {
        raw: hint,
        command: hint.trim().split(/\s+/)[0],
        success: res.code === 0,
        output: res.output,
        cwd: vfs.cwd,
        vfs
      };
      let ok = false;
      try {
        ok = !!task.validate(event, vfs);
      } catch (err) {
        ok = false;
      }
      if (!ok) {
        failed += 1;
        console.error(`FAIL ${course.id}/${mod.id}/${task.id} :: ${hint} :: code=${res.code} out=${String(res.output).slice(0, 80)}`);
      } else {
        console.log(`OK ${task.id}`);
      }
    }
  }
}

if (failed) {
  console.error(`\n${failed} terminal task(s) failed validation`);
  process.exit(1);
}
console.log('\nAll terminal/playground lab checks passed');
