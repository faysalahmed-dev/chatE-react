import React, {Props} from 'react';

interface withLoaderProps<T> extends Props<T> {
	loading: boolean
	[key: string]: any
}  

export default function withLoader<T>(Component: any) {
	return class extends React.Component<withLoaderProps<T>> {
		render() {
			const { loading, ...others } = this.props;
			if(!loading) return <Component {...others}/>
			return (
				<div className='w-full h-full flex items-center justify-center'>
            		<div className='dot-spin'></div>
         		</div>
			)
		}
	}
} 