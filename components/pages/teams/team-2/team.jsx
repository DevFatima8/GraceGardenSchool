'use client';
import Link from 'next/link';
import { useTeamData } from '../../../data/team-data';
import ctaBg from '../../../../public/assets/img/bg/cta-bg.jpg';

const TeamMain = () => {
    const { teamData, isLoading } = useTeamData();
    if (isLoading) return null;

    return (
        <>
            <div className="team__two section-padding">
                <div className="container">
                    <div className="row">
                        {teamData.map((data, id) => (
                            <div className="col-lg-4 col-md-6" key={id}>
                                <div className="team__two-item">
                                    <div className="team__two-item-image">
                                        <img src={data.image.src} alt="team-image" />
                                    </div>
                                    <div className="team__two-item-content">
                                        <h4><Link href={`/team/${data.id}`}>{data.name}</Link></h4>
                                        <span className='text-eight'>{data.position}</span>
                                        <div className="team__two-item-content-social">
                                            <ul>
                                                {data.social_link.map((social, id) => (
                                                    <li key={id}><Link href={social.link} target={social.target}>{social.icon}</Link></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamMain;