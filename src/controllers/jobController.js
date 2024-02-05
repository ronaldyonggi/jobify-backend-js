import JobModel from "../models/jobModel";
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customError';

// GET all job
export const getAllJobs = async (_req, res) => {
  const allJobs = await JobModel.find({});
  return res.status(StatusCodes.OK).json({ allJobs });
};

// GET a single specific job
export const getJob = async (req, res) => {
  const { id } = req.params;
  const matchingJob = await JobModel.findById(id);
  if (!matchingJob) {
    throw new NotFoundError(`no job with id ${id}`);
  }

  return res.status(StatusCodes.OK).json({
    job: matchingJob
  });
};

// CREATE a job
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const newJob = await JobModel.create({ company, position });
  return res.status(StatusCodes.CREATED).json({newJob});

};

// MODIFY a job
export const updateJob = async (req, res) => {
  const { id } = req.params;

  const matchingJob = await JobModel.findByIdAndUpdate(id, req.body, {new: true} );
  if (!matchingJob) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  return res.status(StatusCodes.OK).json({
    msg: 'Job successfully modified',
    job: matchingJob
  });
};

// DELETE a job
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const matchingJob = await JobModel.findByIdAndDelete(id);

  if (!matchingJob) {
    throw new NotFoundError(`No job with id ${id}`);
  }

  return res.status(StatusCodes.ACCEPTED).json({
    msg: 'job deleted',
    job: matchingJob
  });
};