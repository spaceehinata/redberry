    import React, { useEffect, useState } from "react";
    import { useRouter } from "next/router";
    import Styles from "./TaskPage.module.scss";
    import { TaskData } from "@/types";
    import Round from "@/components/Tag/Round/Round"; 
    import Square from "@/components/Tag/Square/Square"; 
    import StatusDropdown from "@/components/StatusDropdown/StatusDropdown"; // ✅ სტატუსის კომპონენტი

    const API_URL = "https://momentum.redberryinternship.ge/api";
    const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

    const TaskPage: React.FC = () => {
    const [task, setTask] = useState<TaskData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) return;

        const fetchTaskData = async () => {
        try {
            const res = await fetch(`${API_URL}/tasks/${id}`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
            });

            if (!res.ok) throw new Error("Failed to fetch task data");

            const taskData = await res.json();
            setTask(taskData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
        };

        fetchTaskData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!task) return <div>No task found</div>;

    return (
    <div className={Styles.container}>
        <div className={Styles.taskHeader}>
            <div className={Styles.taskTags}>
            <Square priority={task.priority.name} size="small" />
            <Round department={task.department.name} />
            </div>
            <h1>{task.name}</h1>
            <p>{task.description}</p>
        </div>

        <div className={Styles.details}>
            <div><p>დავალების დეტალები</p></div>
            <div className={Styles.detailItem}>
            <img src="/asserts/icon1.svg" alt="სტატუსი" className={Styles.icon} />
            <div>
                <p className={Styles.label}>სტატუსი</p>
            </div>
            <StatusDropdown  status={task.status} />
            </div>

            <div className={Styles.detailItem}>
                <img src="/asserts/icon2.svg" alt="თანამშრომელი" className={Styles.icon} />
                <div>
                    <p className={Styles.label}>თანამშრომელი</p>
                </div>
                <div className={Styles.assignee}>
                <div className={Styles.department}>
                    <p >{task.department.name}</p>
                </div>
                <div className={Styles.employeeInfo}>
                    <img src={task.employee.avatar} alt={task.employee.name} className={Styles.avatar} />
                    <p>{task.employee.name} {task.employee.surname}</p>
                </div>
                </div>

            </div>


        <div className={Styles.detailItem}>
            <img src="/asserts/calendar.svg" alt="დაწესებული ვადა" className={Styles.icon} />
            <div>
                <p className={Styles.label}>დავალების ვადა</p>
            </div>
            <p className={Styles.value}>
                {new Date(task.due_date).toLocaleDateString("ka-GE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
                </p>
            </div>
        </div>
    </div>
    );
    };

    export default TaskPage;
