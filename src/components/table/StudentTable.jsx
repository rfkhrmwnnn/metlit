/**
 * StudentTable — Main monitoring table container
 */

import { TASK_KEYS, TASK_LABELS } from '../../utils/constants';
import StudentRow from './StudentRow';

export default function StudentTable({ students, onUpdateTask, onDelete }) {
  if (!students || students.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-surface-300 font-medium">Belum ada data mahasiswa</p>
        <p className="text-surface-400 text-sm mt-1">Tambahkan mahasiswa untuk mulai monitoring</p>
      </div>
    );
  }

  return (
    <div className="table-container shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-700/70 bg-surface-900/70">
              <th className="sticky left-0 z-20 bg-surface-950/90 backdrop-blur-md px-4 text-center border-r border-surface-700/70 w-12">
                No
              </th>
              <th className="sticky left-[48px] z-20 bg-surface-950/90 backdrop-blur-md px-4 border-r border-surface-700/70 min-w-[180px]">
                Nama Mahasiswa
              </th>
              <th className="px-3 text-center border-r border-surface-700/70 min-w-[100px]">
                Status / Progress
              </th>
              {TASK_KEYS.map(key => (
                <th
                  key={key}
                  className="px-1 text-center min-w-[64px]"
                >
                  {TASK_LABELS[key]}
                </th>
              ))}
              <th className="px-4 text-center min-w-[80px]">
                Rata²
              </th>
              <th className="px-4 text-center w-16">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <StudentRow
                key={student.id}
                student={student}
                index={index}
                onUpdateTask={onUpdateTask}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
