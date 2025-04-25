import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../database/project.repository';
import { CreateProjectDto } from '../api/dto/request/create-project.dto';
import { UpdateProjectDto } from '../api/dto/request/update-project.dto';
import { ProjectDocument } from '../database/project.schema';
import { ProjectError } from './project.error';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectError: ProjectError,
  ) {}

  async create(createProjectDto: CreateProjectDto, ownerId: string): Promise<ProjectDocument> {
    // Check if project with same name exists for this owner
    const existingProject = await this.projectRepository.findByName(createProjectDto.name, ownerId);
    if (existingProject) {
      this.projectError.projectAlreadyExists();
    }

    return this.projectRepository.create({
      ...createProjectDto,
      ownerId,
    });
  }

  async findAll(ownerId: string): Promise<ProjectDocument[]> {
    return this.projectRepository.findAll(ownerId);
  }

  async findOne(id: string, ownerId: string): Promise<ProjectDocument> {
    const project = await this.projectRepository.findOne(id, ownerId);
    if (!project) {
      this.projectError.projectNotFound();
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, ownerId: string): Promise<ProjectDocument> {
    // Verify project exists and user has access
    await this.findOne(id, ownerId);

    // If name is being updated, check if new name is unique
    if (updateProjectDto.name) {
      const existingProject = await this.projectRepository.findByName(updateProjectDto.name, ownerId);
      if (existingProject && existingProject._id.toString() !== id) {
        this.projectError.projectAlreadyExists();
      }
    }

    const project = await this.projectRepository.update(id, updateProjectDto, ownerId);
    if (!project) {
      this.projectError.projectNotFound();
    }
    return project;
  }

  async remove(id: string, ownerId: string): Promise<ProjectDocument> {
    // Verify project exists and user has access
    await this.findOne(id, ownerId);

    const project = await this.projectRepository.remove(id, ownerId);
    if (!project) {
      this.projectError.projectNotFound();
    }
    return project;
  }

  async addMember(id: string, memberId: string, ownerId: string): Promise<ProjectDocument> {
    // Verify project exists and user has access
    const project = await this.findOne(id, ownerId);

    // Check if member already exists
    if (project.members.includes(memberId)) {
      this.projectError.memberAlreadyExists();
    }

    const updatedProject = await this.projectRepository.addMember(id, memberId, ownerId);
    if (!updatedProject) {
      this.projectError.projectNotFound();
    }
    return updatedProject;
  }

  async removeMember(id: string, memberId: string, ownerId: string): Promise<ProjectDocument> {
    // Verify project exists and user has access
    const project = await this.findOne(id, ownerId);

    // Check if member exists
    if (!project.members.includes(memberId)) {
      this.projectError.memberNotFound();
    }

    const updatedProject = await this.projectRepository.removeMember(id, memberId, ownerId);
    if (!updatedProject) {
      this.projectError.projectNotFound();
    }
    return updatedProject;
  }
} 