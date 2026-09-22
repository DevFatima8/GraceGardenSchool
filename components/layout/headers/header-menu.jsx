import Link from 'next/link';
import React from 'react';

const MainMenu = () => {
    return (
        <>    
            <ul>
                <li><Link href='/'>Home</Link></li>
                
                <li className='menu-item-has-children'><Link href='/about-us'>About Us</Link>
                    <ul className='sub-menu'>
                        <li><Link href='/about-us#history'>Our History</Link></li>
                        <li><Link href='/about-us#motto'>School Motto</Link></li>
                        <li><Link href='/about-us#vision'>Vision Statement</Link></li>
                        <li><Link href='/about-us#governors'>Board of Governors</Link></li>
                        <li><Link href='/about-us#core-values'>Core Values</Link></li>
                    </ul>
                </li>

                <li className='menu-item-has-children'><Link href='#'>Our School</Link>
                    <ul className='sub-menu'>
                        <li><Link href='/virtual-tour'>Virtual Tour</Link></li>
                        <li><Link href='/gallery'>Gallery</Link></li>
                        <li><Link href='/curriculum'>Curriculum</Link></li>
                        <li><Link href='/commitment-to-character-and-conduct'>Commitment to Character and Conduct</Link></li>
                        


                        <li className='menu-item-has-children'><Link href='#'>Yearly Competitions</Link>
                            <ul className='sub-menu'>
                                <li><Link href='/annual-sports-meet'>Annual Sports Meet</Link></li>
                                <li><Link href='/brain-competition'>Brain of Grace Garden</Link></li>
                                <li><Link href='/literary-competition'>Literary Competition</Link></li>
                            </ul>
                        </li>

                        <li><Link href='/school-uniform'>School Uniform</Link></li>

                        <li className='menu-item-has-children'><Link href='#'>Facilities</Link>
                            <ul className='sub-menu'>
                                <li><Link href='/computer-lab'>Computer Lab</Link></li>
                                <li><Link href='/science-lab'>Science Lab</Link></li>
                                <li><Link href='/club-activity'>Club Activity</Link></li>
                                <li><Link href='/extra-courses'>Extra Courses (Chinese, AI, Robotics)</Link></li>
                            </ul>
                        </li>

                        <li><Link href='/academics'>Academics</Link></li>



                        <li className='menu-item-has-children'><Link href='#'>Events</Link>
                            <ul className='sub-menu'>
                                <li><Link href='/school-day'>School Day</Link></li>
                                <li><Link href='/celebrations'>Celebrations</Link></li>
                                <li><Link href='/science-art-exhibition'>Science & Art Exhibition</Link></li>
                                <li><Link href='/annual-drama'>Annual Drama</Link></li>
                            </ul>
                        </li>

                        <li><Link href='/activities'>Activities</Link></li>
                    </ul>
                </li>

                <li className='menu-item-has-children'><Link href='/admissions'>Admissions</Link>
                    <ul className='sub-menu'>
                        <li><Link href='/admissions#why-ggs'>Why Grace Garden</Link></li>
                        <li><Link href='/admissions#overview'>Overview</Link></li>
                        <li><Link href='/admissions#process'>Admission Process</Link></li>
                        <li><Link href='/registrations'>Register Now</Link></li>
                        <li><Link href='/fee-structure'>Fee Structure</Link></li>
                        <li><Link href='/books-lists'>Books Lists</Link></li>
                    </ul>
                </li>

                <li className='menu-item-has-children'><Link href='#'>Classes</Link>
                    <ul className='sub-menu'>
                        <li className='menu-item-has-children'><Link href='#'>Pre School</Link>
                            <ul className='sub-menu'>
                                <li><Link href='/pre-nursery'>Pre Nursery</Link></li>
                                <li><Link href='/nursery-a'>Nursery A</Link></li>
                                <li><Link href='/nursery-b'>Nursery B</Link></li>
                                <li><Link href='/prep-a'>Prep A</Link></li>
                                <li><Link href='/prep-b'>Prep B</Link></li>
                            </ul>
                        </li>

                        <li className='menu-item-has-children'><Link href='#'>Primary Section</Link>
                            <ul className='sub-menu'>
                                <li><Link href='/1-a'>1 A</Link></li>
                                <li><Link href='/1-b'>1 B</Link></li>
                                <li><Link href='/2-a'>2 A</Link></li>
                                <li><Link href='/2-b'>2 B</Link></li>
                                <li><Link href='/3-a'>3 A</Link></li>
                                <li><Link href='/3-b'>3 B</Link></li>
                                <li><Link href='/4-a'>4 A</Link></li>
                                <li><Link href='/4-b'>4 B</Link></li>
                                <li><Link href='/5-a'>5 A</Link></li>
                                <li><Link href='/5-b'>5 B</Link></li>
                            </ul>
                        </li>

                        <li className='menu-item-has-children'><Link href='#'>Middle Section</Link>
                            <ul className='sub-menu'>
                                <li><Link href='/6-a'>6 A</Link></li>
                            </ul>
                        </li>

                        <li className='menu-item-has-children'><Link href='#'>2nd Shift</Link>
                            <ul className='sub-menu'>
                                <li><Link href='/nursery-e'>Nursery E</Link></li>
                                <li><Link href='/prep-e'>Prep E</Link></li>
                                <li><Link href='/1-e'>1 E</Link></li>
                                <li><Link href='/2-e'>2 E</Link></li>
                                <li><Link href='/3-e'>3 E</Link></li>
                                <li><Link href='/4-e'>4 E</Link></li>
                                <li><Link href='/5-e'>5 E</Link></li>
                                <li><Link href='/6-e'>6 E</Link></li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li className='menu-item-has-children'><Link href='#'>Departments</Link>
                    <ul className='sub-menu'>
                        <li><Link href='/ace'>ACE</Link></li>
                        <li><Link href='/set'>SET</Link></li>
                        <li className='menu-item-has-children'><Link href='#'>Coordinators</Link>
                            <ul className='sub-menu'>
                                <li><Link href='/pre-school'>Pre-School</Link></li>
                                <li><Link href='/lower-primary'>Lower Primary</Link></li>
                                <li><Link href='/upper-primary'>Upper Primary</Link></li>
                                <li><Link href='/middle'>Middle</Link></li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li><Link href='/careers'>Careers</Link></li>
                <li><Link href='/contact'>Contact Us</Link></li>
            </ul>  
        </>
    );
};

export default MainMenu;