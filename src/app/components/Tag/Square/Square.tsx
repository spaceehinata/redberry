"use client"; // Required for client-side fetching

import React, { useEffect, useState } from "react";
import styles from "./Square.module.scss";
import clsx from "clsx";

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

type Size = "big" | "small";

interface PriorityData {
  id: number;
  name: string;
}

type Props = {
  priority: string;
  size: Size;
  icon?: string;
  label?: string;
};

const Square = ({ priority, size, icon, label }: Props) => {
  const [priorities, setPriorities] = useState<PriorityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        const response = await fetch(`${API_URL}/priorities`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch priorities");
        }

        const prioritiesData = await response.json();
        setPriorities(prioritiesData);
        console.log("Priorities fetched:", prioritiesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPriorities();
  }, []);

  const getPriorityDetails = (priorityName: string) => {
    const priorityData = priorities.find((p) => p.name === priorityName);
    if (!priorityData) {
      return { icon: "/asserts/Medium.svg", label: "Medium", color: "yellow" }; // Fallback
    }

    switch (priorityName) {
      case "მაღალი":
        return { icon: "/asserts/High.svg", label: "მაღალი", color: "red" };
      case "საშუალო":
        return {
          icon: "/asserts/Medium.svg",
          label: "საშუალო",
          color: "yellow",
        };
      case "დაბალი":
        return { icon: "/asserts/Low.svg", label: "დაბალი", color: "green" };
      default:
        return {
          icon: "/asserts/Medium.svg",
          label: priorityName,
          color: "yellow",
        };
    }
  };

  if (loading) return <div>Loading priority...</div>;
  if (error) return <div>Error: {error}</div>;

  const {
    icon: priorityIcon,
    label: priorityLabel,
    color,
  } = getPriorityDetails(priority);

  return (
    <div className={clsx(styles.button, styles[color], styles[size])}>
      <img src={icon || priorityIcon} alt={label || priorityLabel} />
      <span>{label || priorityLabel}</span>
    </div>
  );
};

export default Square;
