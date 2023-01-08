import PostModel from "../models/Post.js"
import ComentModel from '../models/Coment.js'

export const GetAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('author').exec()
        res.json(posts.sort((oldPost, newPost) => newPost.createdAt - oldPost.createdAt))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Faild to found the post'
        })
    }
};

export const GetPopular = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('author').exec()
        res.json(posts.sort((minViews, maxViews) => maxViews.viewsCount - minViews.viewsCount))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Faild to found the post'
        })
    }
};


export const Create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            image: req.body.image,
            tags: req.body.tags.split(','),
            author: req.userId
        });

        const post = await doc.save();

        res.send(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Faild to create the post'
        })
    }
};

export const GetOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findByIdAndUpdate(
            {
            _id: postId
            },
            {
                $inc: {viewsCount: 1}
            },
            {
                returnDocument: 'after'
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        massage: 'Couldn\'t to found the post'
                    })
                }

                if(!doc) {
                    return res.status(404).json({
                        massage: 'Couldn\'t to found the post'
                    })
                }

                res.json(doc)
            }
        ).populate('author')
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Couldn\'t to found the post'
        })
    }
};

export const Remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findByIdAndDelete(
            {
                _id: postId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        massage: 'Couldn\'t to found the post'
                    })
                }

                if(!doc) {
                    return res.status(404).json({
                        massage: 'Couldn\'t to found the post'
                    })
                }

                res.json({
                    succes: true,
                })
            }
        )


    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Couldn\'t to found the post'
        })
    }
};

export const Update = async (req, res) => {
    try {

        const postId = req.params.id

        await PostModel.findByIdAndUpdate(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                image: req.body.image,
                tags: req.body.tags.split(','),
                author: req.userId
            }
        );

        res.json({
            succes: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Coudn\'t update the post'
        })
    }
};

export const GetLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()
        const popularPosts =  posts.sort((minViews, maxViews) => maxViews.viewsCount - minViews.viewsCount)
        const tags = popularPosts.map(obj => obj.tags).flat().slice(0, 5)
        
        res.json(tags)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Faild to found the post'
        })
    }
}

export const GetComents = async (req, res) => {

    try {
        const coments = await ComentModel.find().populate('author').exec()
        console.log(coments)
        res.send(coments.sort((oldComents, newComents) => newComents.createdAt - oldComents.createdAt))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Faild to found the coments'
        })
    }
}

export const CreateComents = async (req, res) => {
    const postId = req.params.id
    try {
        const doc = new ComentModel({
            text: req.body.text,
            author: req.userId,
            post: postId
        })

        // console.log(doc)
        const coment = await doc.save();

        const post = await PostModel.findByIdAndUpdate(
            {
                _id: postId,
            },
            {
                $push: {coments: coment}
            }
        );

        post.coments.push(coment)

        res.json({
            succes: true
        })
        

        // res.send(coment)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Faild to create the coments'
        })
    }
}