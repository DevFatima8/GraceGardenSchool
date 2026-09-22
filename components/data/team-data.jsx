'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTeamData = () => {
    const [teamData, setTeamData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await axios.get('/api/team');
                if (response.data.success && response.data.data) {
                    setTeamData(response.data.data);
                } else {
                    setTeamData([]);
                }
            } catch (error) {
                console.error("Failed to load team data", error);
                setTeamData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeam();
    }, []);

    return { teamData, isLoading };
};