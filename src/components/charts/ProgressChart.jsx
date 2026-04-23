/**
 * ProgressChart — Recharts visualizations for the dashboard
 */

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { calculateProgress, calculateAverage } from '../../utils/calculations';
import { getClusterDistribution } from '../../utils/clustering';

// Custom tooltip for bar chart
function CustomBarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 shadow-xl border border-surface-700/60">
      <p className="text-xs font-semibold text-surface-200 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: <span className="font-bold">{entry.value}%</span>
        </p>
      ))}
    </div>
  );
}

// Custom tooltip for pie chart
function CustomPieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="glass rounded-xl p-3 shadow-xl border border-surface-700/60">
      <p className="text-xs font-semibold text-surface-200">{data.name}</p>
      <p className="text-xs text-surface-400">
        {data.value} mahasiswa ({data.payload.percentage}%)
      </p>
    </div>
  );
}

export function StudentProgressChart({ students }) {
  const data = students
    .map(s => ({
      name: s.name.length > 8 ? s.name.substring(0, 8) + '…' : s.name,
      Progress: calculateProgress(s),
      'Rata-rata': calculateAverage(s),
    }))
    .sort((a, b) => b.Progress - a.Progress);

  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-surface-200 mb-4">Progress per Mahasiswa</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d4dce8" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#4b5563', fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fill: '#4b5563', fontSize: 10 }} domain={[0, 100]} />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar dataKey="Progress" fill="#2f8fff" radius={[4, 4, 0, 0]} barSize={14} />
            <Bar dataKey="Rata-rata" fill="#0ea89b" radius={[4, 4, 0, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ClusterPieChart({ students }) {
  const distribution = getClusterDistribution(students);

  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-surface-200 mb-4">Distribusi Cluster</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="count"
              nameKey="name"
            >
              {distribution.map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              formatter={(value) => <span className="text-surface-300">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
