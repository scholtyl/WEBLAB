import { Request, Response } from "express";
import { Router } from "express";
import getDB from "../DB/db";
import { StatisticsDTO } from "../DTOs/statisticsDTO";

const router = Router();

router.get("", async (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  console.log(`[Info] Statistics requested for user ${userId}.`);

  const db = await getDB();
  const query = `
    WITH active_machines AS (
    SELECT id AS machineId, name AS machine_name
    FROM machines
    WHERE is_active = 1
    ),
    months AS (
        SELECT strftime('%Y-%m', date('now', '-0 months')) AS training_month
        UNION ALL
        SELECT strftime('%Y-%m', date('now', '-1 months'))
        UNION ALL
        SELECT strftime('%Y-%m', date('now', '-2 months'))
        UNION ALL
        SELECT strftime('%Y-%m', date('now', '-3 months'))
        UNION ALL
        SELECT strftime('%Y-%m', date('now', '-4 months'))
        UNION ALL
        SELECT strftime('%Y-%m', date('now', '-5 months'))
    ),
    training_data AS (
        SELECT 
            machine_Id,
            strftime('%Y-%m', date) AS training_month,
            AVG((weight1 + weight2 + weight3) / 3.0) AS avg_weight
        FROM trainings
        WHERE user_id = ?
        GROUP BY machine_Id, training_month
    )
    SELECT 
        am.machineId,
        am.machine_name,
        m.training_month,
        COALESCE(td.avg_weight, 0) AS avg_weight
    FROM active_machines am
    CROSS JOIN months m
    LEFT JOIN training_data td 
        ON am.machineId = td.machine_Id 
        AND m.training_month = td.training_month
    ORDER BY am.machineId, m.training_month DESC;
  `;

  const statistics: StatisticsDTO[] = await db.all(query, userId);

  res.json(statistics);
});

export default router;
