import Head from 'next/head';
import { Fragment } from 'react';

import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../lib/posts-util';

export default function SinglePostPage(props) {
	const imagePath = `https://justin-blog-nextjs.vercel.app/images/posts/${props.post.slug}/${props.post.image}`;
	const twitterHandle = '@jelmore1674';
	const currentURL = `https://blog.justinelmore.dev/posts/${props.post.slug}`;
	const siteName = 'Justin Elmore Blog';
	return (
		<Fragment>
			<Head>
				<title>{props.post.title}</title>
				<meta name='description' content={props.post.excerpt} />
				<meta name='twitter:card' content='summary_large_image' />
				<meta property='twitter:image' content={imagePath} />
				<meta
					name='twitter:creator'
					content={twitterHandle}
					key='twhandle'
				/>

				{/* Open Graph */}
				<meta property='og:url' content={currentURL} key='ogurl' />
				<meta property='og:type' content='article' />
				<meta property='og:image' content={imagePath} key='ogimage' />
				<meta property='og:image:width' content='500' />
				<meta property='og:image:height' content='500' />
				<meta
					property='og:site_name'
					content={siteName}
					key='ogsitename'
				/>
				<meta
					property='og:title'
					content={props.post.title}
					key='ogtitle'
				/>
				<meta
					property='og:description'
					content={props.post.excerpt}
					key='ogdesc'
				/>
			</Head>
			<PostContent post={props.post} />
		</Fragment>
	);
}

export function getStaticProps(context) {
	const { params } = context;
	const { slug } = params;

	const postData = getPostData(slug);
	return {
		props: {
			post: postData,
		},
		revalidate: 600,
	};
}

export function getStaticPaths() {
	const postFileNames = getPostsFiles();
	const slugs = postFileNames.map((fileName) =>
		fileName.replace(/\.md$/, '')
	);
	return {
		paths: slugs.map((slug) => ({ params: { slug: slug } })),
		fallback: false,
	};
}
