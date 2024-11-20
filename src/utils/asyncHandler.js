

const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(
            requestHandler(req,res,next)
        ).catch((err)=>next(err))
    }

}

export default asyncHandler



//another approach

// const asyncHandler = (handler) => {
//     return async (req, res, next) => {
//         try {
//             await handler(req, res, next);
//         } catch (err) {
//             next(err);
//             res.status(err.code || 500).json({
//                 success : false,
//                 message:err.message 
//             })
//         }
//     };
// };
