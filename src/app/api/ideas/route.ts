import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { ideaSchema, searchIdeasSchema } from '@/lib/validations';
import { ErrorCode } from '@/types';

// POST /api/ideas - 提交新想法
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    // 验证请求数据
    const validationResult = ideaSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: ErrorCode.VALIDATION_ERROR,
            message: '数据验证失败',
            details: validationResult.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const { title, description, category, tags, contactEmail } = validationResult.data;

    // 如果用户已登录，使用用户ID，否则使用联系邮箱
    const userId = session?.user?.id ? parseInt(session.user.id) : null;
    const finalContactEmail = contactEmail || session?.user?.email || null;

    // 创建想法记录
    const idea = await prisma.idea.create({
      data: {
        title,
        description,
        category,
        tags: tags || [],
        contactEmail: finalContactEmail,
        userId,
        status: 'pending',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: idea.id.toString(),
        title: idea.title,
        description: idea.description,
        category: idea.category,
        tags: idea.tags,
        status: idea.status,
        contactEmail: idea.contactEmail,
        user: idea.user,
        createdAt: idea.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating idea:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: ErrorCode.SERVER_ERROR,
          message: '服务器错误，请稍后重试',
        },
      },
      { status: 500 }
    );
  }
}

// GET /api/ideas - 获取想法列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      query: searchParams.get('query') || undefined,
      category: searchParams.get('category') || undefined,
      status: searchParams.get('status') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    };

    // 验证查询参数
    const validationResult = searchIdeasSchema.safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: ErrorCode.VALIDATION_ERROR,
            message: '查询参数无效',
            details: validationResult.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const { query, category, status, page, limit } = validationResult.data;

    // 构建查询条件
    const where: any = {};
    
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }
    
    if (category) {
      where.category = category;
    }
    
    if (status) {
      where.status = status;
    }

    // 计算偏移量
    const skip = (page - 1) * limit;

    // 查询想法列表和总数
    const [ideas, total] = await Promise.all([
      prisma.idea.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.idea.count({ where }),
    ]);

    // 计算分页信息
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return NextResponse.json({
      success: true,
      data: {
        data: ideas.map((idea) => ({
          id: idea.id.toString(),
          title: idea.title,
          description: idea.description,
          category: idea.category,
          tags: idea.tags,
          status: idea.status,
          contactEmail: idea.contactEmail,
          user: idea.user,
          createdAt: idea.createdAt,
          updatedAt: idea.updatedAt,
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext,
          hasPrev,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: ErrorCode.SERVER_ERROR,
          message: '服务器错误，请稍后重试',
        },
      },
      { status: 500 }
    );
  }
}