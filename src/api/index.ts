import type { Project } from '@/types/project';
import { query } from 'webkit/api';

const getAllProjectsQuery = `{
    allProjects {
        slug
        name
        ticker
        logoUrl
      }
}`;

type getAllProjectsQueryType = Record<'allProjects', Project[]>;

const allProjectsResolver = ({ allProjects }: getAllProjectsQueryType) => allProjects;
const allProjectsReject = (err) => console.log(err);

export const getAllProjects = () =>
	query<getAllProjectsQueryType, Project[]>(getAllProjectsQuery).then(
		allProjectsResolver,
		allProjectsReject
	);
