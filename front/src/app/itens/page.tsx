import React from 'react';
import Image from 'next/image';
import { CarouselSize } from '@/components/cards/index';

export default function Itens() {
    return (
        <div className='sm:ml-60 p-4'>
            <div className='flex items-start justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <Image src="/img/jack.jpg" alt="Jack" width={600} height={600}  className=''/>
                </div>
                <div>
                    <div className='flex flex-row items-start justify-start'>
                        <h1 className='font-extrabold text-[38px]'>Jack Danius Maça Verdi</h1>
                        <span className='ml-4 font-extrabold text-[38px] text-amber-500'>R$ 12,00</span>
                    </div>
                    <span className='font-light'>Uma deliciosa combinação de whisky Jack Daniels com maçã verde, perfeito para momentos especiais.</span>
                </div>
            </div>
            <CarouselSize />
        </div>
    )
}

