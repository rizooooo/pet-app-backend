import { NextFunction, Request, Response } from "express";
import { Pet } from './../models';

const PetController = {
    GET: async (req: Request, res: Response, next: NextFunction) => {

        const id = req.params.id || null;
        const query = req.query || {};

        const sortQuery: any = {};
        if (query && query.sort) {
            const querySort = query.sort.toString().split(',');

            querySort.forEach(a => {
                const [prop, value] = a.split(' ');
                sortQuery[prop] = value;
            })
        }

        const querySearch: any = {};
        if (query) {
            Object.keys(query).forEach(a => {
                if (a === 'sort') {
                    return;
                }

                if (a !== 'age') {
                    querySearch[a] = {
                        $regex: query[a],
                        $options: 'i'
                    };
                } else {

                    if (query[a]) {
                        console.log(query[a], 'query[a]')
                        querySearch[a] = {
                            $eq: query[a] || null
                        };
                    }

                }

            })
        }

        try {
            const result = id ? await Pet.findById(id) : await Pet.find(querySearch || {}).sort(sortQuery);
            return res.status(200).json({
                success: true,
                data: result
            })
        } catch (error) {
            if (id) {
                return res.status(404).json({
                    success: false,
                    error: 'Not Found'
                })
            } else {

                console.log(error)
                return res.status(500).json({
                    success: false,
                    error: 'Server Error'
                })
            }

        }
    },
    POST: async (req: Request, res: Response, next: NextFunction) => {
        console.log('IM IN POST!!')
        console.log(req.body);

        try {
            const response = await Pet.create(req.body);

            return res.status(201).json({
                success: true,
                data: response
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error
            })
        }
    },
    PUT: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await Pet.findByIdAndUpdate(req.params.id, req.body);
            return res.status(201).json({
                success: true,
                data: response
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error
            })
        }
    },
    DELETE: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await Pet.findByIdAndDelete(req.params.id);
            return res.status(201).json({
                success: true,
                data: response
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error
            })
        }
    }
}


export default PetController;