import PostModel from "../models/Post.js"

export const GetAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('author').exec()
        res.json(posts)
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
            tags: req.body.tags,
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
        )
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
                tags: req.body.tags,
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

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)
        
        res.json(tags)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: 'Faild to found the post'
        })
    }
}