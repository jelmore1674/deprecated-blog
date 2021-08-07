import PostHeader from './post-header';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import classes from './post-content.module.css';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import docker from 'react-syntax-highlighter/dist/cjs/languages/prism/docker';
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import sass from 'react-syntax-highlighter/dist/cjs/languages/prism/sass';
import yml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('docker', docker);
SyntaxHighlighter.registerLanguage('ts', ts);
SyntaxHighlighter.registerLanguage('sass', sass);
SyntaxHighlighter.registerLanguage('yml', yml);

export default function PostContent(props) {
	const imagePath = `/images/posts/${props.post.slug}/${props.post.image}`;
	const customRenderers = {
		// img(image) {
		// 	return (
		// 		<Image
		// 			src={`/images/posts/${props.post.slug}/${image.src}`}
		// 			alt={image.alt}
		// 			width={600}
		// 			height={300}
		// 		/>
		// 	);
		// },
		p(paragraph) {
			const { node } = paragraph;
			if (node.children[0].tagName === 'img') {
				const image = node.children[0];
				return (
					<div className={classes.image}>
						<Image
							src={`/images/posts/${props.post.slug}/${image.properties.src}`}
							alt={image.alt}
							width={600}
							height={300}
						/>
					</div>
				);
			}

			return <p>{paragraph.children}</p>;
		},
		code(code) {
			const { className, children } = code;
			const language = className.split('-')[1];
			return (
				<SyntaxHighlighter style={atomDark} language={language}>
					{children}
				</SyntaxHighlighter>
			);
		},
	};

	return (
		<article className={classes.content}>
			<PostHeader title={props.post.title} image={imagePath} />
			<ReactMarkdown components={customRenderers}>
				{props.post.content}
			</ReactMarkdown>
		</article>
	);
}
